'use client';

import React from 'react';
import Link from 'next/link'; // For the invite button
import { motion } from 'framer-motion'; // Import motion

export default function JoinPage() {
  const serverId = "1054844660272594974"; // <-- Updated Server ID
  const inviteLink = "https://discord.gg/KBjkfHKqnm"; // <-- Updated Invite Link

  // Construct the widget URL
  const widgetUrl = `https://discord.com/widget?id=${serverId}&theme=dark`;

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-4 text-cyan-400">Join the Community</h1>
        <p className="text-2xl text-purple-400 font-semibold">
          Jumpstart your Journey!
        </p>
      </div>

      {/* Use Flexbox for centering and layout */}
      <div className="flex flex-col lg:flex-row items-center lg:items-start justify-center gap-8 lg:gap-12 max-w-4xl mx-auto">

        {/* Invite Section */}
        <div className="w-full max-w-sm lg:w-1/3 bg-gray-800/50 p-6 rounded-lg shadow-lg border border-gray-700 flex flex-col">
          <h2 className="text-2xl font-semibold text-cyan-300 mb-4 text-center">Get Connected</h2>
          <p className="text-gray-400 mb-6 text-center flex-grow">
            Click the button below to join our official Discord server, connect with members, participate in discussions, and stay updated on events.
          </p>
          <motion.div // Wrap Link for animation
            whileHover={{ scale: 1.03, y: -2 }}
            transition={{ type: 'spring', stiffness: 300 }}
            className="mt-auto" // Ensure it stays at bottom
          >
            <Link
              href={inviteLink}
              target="_blank"
              rel="noopener noreferrer"
              className="block w-full text-center bg-purple-600 hover:bg-purple-500 text-white font-bold py-3 px-6 rounded-md transition duration-300 shadow-lg shadow-purple-500/30 text-lg"
            >
              Join Discord Server
            </Link>
          </motion.div>
        </div>

        {/* Widget Section */}
        <div className="flex flex-col items-center w-full lg:w-auto">
          <h2 className="text-2xl font-semibold text-cyan-300 mb-4 text-center">Who&apos;s Online?</h2>
          <iframe
            src={widgetUrl}
            width="350"
            height="500"
            allowTransparency={true} // Kept camelCase based on TS error
            frameBorder="0"
            sandbox="allow-popups allow-popups-to-escape-sandbox allow-same-origin allow-scripts"
            className="rounded-lg shadow-lg border border-gray-700 bg-gray-900/80 max-w-full"
            title="Discord Server Widget"
          ></iframe>
        </div>

      </div>
    </div>
  );
} 