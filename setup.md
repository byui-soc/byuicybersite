# Next.js Deployment Setup with GitHub Actions

This guide outlines the steps to prepare a server and configure GitHub Actions
for automated deployment of the Next.js application upon pushes to the `main`
branch.

## Phase 1: Server Preparation

Run these commands and perform these steps **on your deployment server**.

1.  **Install Node.js:**
    *   Ensure you have Node.js installed (LTS version recommended). Installation methods vary by OS (e.g., NVM, apt, yum).
    *   Verify installation: `node -v`

2.  **Install PM2:**
    *   PM2 is a production process manager for Node.js applications.
    *   Install globally: `sudo npm install pm2 -g`

3.  **SSH Key Setup:**
    *   GitHub Actions requires SSH key authentication (not password).
    *   **Generate Keys:** If you don't have a pair, generate one: `ssh-keygen -t rsa -b 4096` (Press Enter for defaults).
    *   **Authorize Key:** Copy the **public** key content (usually from `~/.ssh/id_rsa.pub`) into the `~/.ssh/authorized_keys` file on your server.
        ```bash
        # Example command (if generating keys on local machine):
        # cat ~/.ssh/id_rsa.pub | ssh your_user@your_server_ip 'mkdir -p ~/.ssh && chmod 700 ~/.ssh && cat >> ~/.ssh/authorized_keys && chmod 600 ~/.ssh/authorized_keys'

        # Example command (if generating keys on the server):
        # mkdir -p ~/.ssh
        # chmod 700 ~/.ssh
        # cat ~/.ssh/id_rsa.pub >> ~/.ssh/authorized_keys
        # chmod 600 ~/.ssh/authorized_keys
        ```
    *   **Secure Private Key:** Note the location of the **private** key (usually `~/.ssh/id_rsa`). You will need its *content* for GitHub Secrets. Keep this file secure and private.

4.  **Create Deployment Directory:**
    *   Choose and create the directory where the application files will reside on the server.
    *   Example: `mkdir -p /var/www/cybersociety-app`

5.  **(Optional but Recommended) Initial Manual Deploy & PM2 Start:**
    *   Manually copy your project (or essential files like `package.json`, `package-lock.json`, `.next/`, `public/`, `next.config.mjs`) to the server directory (`/var/www/cybersociety-app`).
    *   Navigate to the directory on the server: `cd /var/www/cybersociety-app`
    *   Install production dependencies: `npm install --production`
    *   Start the app with PM2 (replace `"cybersociety-app"` with your preferred name):
        ```bash
        pm2 start npm --name "cybersociety-app" -- start
        ```
        *(The `start` script in `package.json` typically runs `next start`)*
    *   Save the PM2 process list for reboot persistence: `pm2 save`
    *   Verify it's running: `pm2 list`

## Phase 2: GitHub Actions Workflow Setup

Perform these steps in your GitHub repository.

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