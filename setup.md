# Next.js Deployment Setup with GitHub Actions

This guide outlines the steps to prepare a server and configure GitHub Actions
for automated deployment of the Next.js application upon pushes to the `main`
branch.

## Phase 1: Server Preparation

Run these commands and perform these steps **on your Ubuntu deployment server**.

1.  **Update System & Install Prerequisites:**
    *   Ensure your system is up-to-date and install `curl` (if not present) and `build-essential` (for potential native npm modules):
        ```bash
        sudo apt update && sudo apt upgrade -y
        sudo apt install -y curl build-essential
        ```

2.  **Install Node.js (using NodeSource):**
    *   This method allows installing specific Node.js versions (e.g., v23.x based on v23.9.0 used in development).
    *   Download and run the NodeSource setup script for the major version:
        ```bash
        # Note: Node.js v23 is not an LTS release. Consider using the latest LTS (e.g., 20.x or 22.x) for production servers.
        # Using 23.x will install the latest available Node.js v23 release.
        curl -fsSL https://deb.nodesource.com/setup_23.x | sudo -E bash -
        ```
    *   Install Node.js:
        ```bash
        sudo apt install -y nodejs
        ```
    *   Verify installation (should show latest v23.x.x): `node -v` and `npm -v`
    *   *(Alternative: Install Node.js via NVM (Node Version Manager) for more flexibility if needed: [https://github.com/nvm-sh/nvm#installing-and-updating](https://github.com/nvm-sh/nvm#installing-and-updating))* 

3.  **Install PM2:**
    *   PM2 is a production process manager for Node.js applications.
    *   Install globally using npm:
        ```bash
        sudo npm install pm2 -g
        ```

4.  **SSH Key Setup:**
    *   GitHub Actions requires SSH key authentication (not password).
    *   **Generate Keys:** If you don't have a pair on the server, generate one:
        ```bash
        ssh-keygen -t rsa -b 4096 # Press Enter for defaults
        ```
    *   **Authorize Key:** Copy the **public** key content (from `~/.ssh/id_rsa.pub`) into the `~/.ssh/authorized_keys` file.
        ```bash
        # Ensure the .ssh directory and file exist with correct permissions
        mkdir -p ~/.ssh
        chmod 700 ~/.ssh
        cat ~/.ssh/id_rsa.pub >> ~/.ssh/authorized_keys
        chmod 600 ~/.ssh/authorized_keys
        ```
        *(If your deployment key is generated elsewhere, securely copy the public key content to `~/.ssh/authorized_keys`)*
    *   **Secure Private Key:** Note the location of the **private** key (usually `~/.ssh/id_rsa`). You will need its *content* for GitHub Secrets. Keep this file secure and private.

5.  **Create Deployment Directory:**
    *   Choose and create the directory where the application files will reside on the server.
    *   Example: `sudo mkdir -p /var/www/cybersociety-app`
    *   Set appropriate ownership (replace `your_deploy_user` with the user that will run the app/pm2, often the same user you SSH in with for Actions):
        ```bash
        sudo chown your_deploy_user:your_deploy_user /var/www/cybersociety-app
        ```

6.  **(Optional but Recommended) Initial Manual Deploy & PM2 Start:**
    *   Manually copy your project (or essential files like `package.json`, `package-lock.json`, `.next/`, `public/`, `next.config.mjs`) to the server directory (`/var/www/cybersociety-app`).
    *   Navigate to the directory on the server: `cd /var/www/cybersociety-app`
    *   Install production dependencies: `npm install --production`
    *   Start the app with PM2 (replace `"cybersociety-app"` with your preferred name):
        ```bash
        # Run as the deploy user, not root
        pm2 start npm --name "cybersociety-app" -- start 
        ```
        *(The `start` script in `package.json` typically runs `next start`)*
    *   Save the PM2 process list for reboot persistence:
        ```bash
        pm2 save
        ```
    *   Set PM2 to start on boot (follow the output instructions):
        ```bash
        pm2 startup # Follow the instructions given by this command
        ```
    *   Verify it's running: `pm2 list`

## Phase 2: GitHub Actions Workflow Setup

Perform these steps in your GitHub repository: `https://github.com/byui-soc/byuicybersite.git`

1.  **Create GitHub Secrets:**
    *   Go to your repository on GitHub: `Settings` -> `Secrets and variables` -> `Actions`.
    *   Click `New repository secret` for each of the following:
        *   `SERVER_HOST`: Hostname or IP address of your deployment server.
        *   `SERVER_USER`: Username for SSH connection.
        *   `SSH_PRIVATE_KEY`: The **entire content** of your private SSH key file (including `-----BEGIN...` and `-----END...` lines).
        *   `TARGET_DIR`: Absolute path to the deployment directory on your server (e.g., `/var/www/cybersociety-app`).

2.  **Create Workflow File:**
    *   In your local project root (`cybersociety-app`), create the directory structure `.github/workflows/` if it doesn't exist.
    *   Inside `.github/workflows/`, create a file named `deploy.yml`.

3.  **Add Workflow Content:**
    *   Paste the following YAML content into `deploy.yml`:

    ```yaml
    name: Deploy Next.js App

    on:
      push:
        branches:
          - main # Adjust if your default branch is different (e.g., master)

    jobs:
      deploy:
        runs-on: ubuntu-latest

        steps:
          - name: Checkout code
            uses: actions/checkout@v4

          - name: Set up Node.js
            uses: actions/setup-node@v4
            with:
              node-version: '20' # Specify your Node.js version (LTS recommended)
              cache: 'npm'
              cache-dependency-path: '**/package-lock.json' # Cache dependencies

          - name: Install dependencies
            run: npm ci # Use ci for clean installs in CI/CD

          - name: Build Next.js app
            run: npm run build

          - name: Deploy to Server via SCP
            uses: appleboy/scp-action@master # Use SCP to copy build files
            with:
              host: ${{ secrets.SERVER_HOST }}
              username: ${{ secrets.SERVER_USER }}
              key: ${{ secrets.SSH_PRIVATE_KEY }}
              # Ensure all necessary files/dirs are listed (comma-separated)
              # Add next.config.mjs only if it exists in your project root
              source: ".next/,public/,package.json,package-lock.json,next.config.mjs" 
              target: ${{ secrets.TARGET_DIR }}
              strip_components: 1 # Adjust if needed based on source structure

          - name: Run commands on Server via SSH
            uses: appleboy/ssh-action@master
            with:
              host: ${{ secrets.SERVER_HOST }}
              username: ${{ secrets.SERVER_USER }}
              key: ${{ secrets.SSH_PRIVATE_KEY }}
              script: |
                cd ${{ secrets.TARGET_DIR }}
                npm install --production # Install only production dependencies
                # Ensure pm2 app name matches the one used in manual setup
                pm2 reload cybersociety-app || pm2 restart cybersociety-app 
    ```

## Usage

1.  Complete the server preparation steps.
2.  Add the required secrets to your GitHub repository.
3.  Commit the `.github/workflows/deploy.yml` file to your repository.
4.  Push the changes to your `main` branch on GitHub.

GitHub Actions will now automatically build and deploy your application whenever you push to the `main` branch. Monitor progress in the "Actions" tab of your repository. 