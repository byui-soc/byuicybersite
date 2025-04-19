// 'use client'; <-- No longer needed as we removed the form handler

import React from 'react';
import Link from 'next/link';

export default function ContactPage() {

  const inviteLink = "https://discord.gg/KBjkfHKqnm";

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <h1 className="text-4xl font-bold mb-6 text-cyan-400">Contact Us</h1>
      <p className="text-lg text-gray-300 mb-8">
        Have questions, suggestions, or want to get involved? Reach out to us!
      </p>

      <div className="bg-gray-800/50 p-8 rounded-lg shadow-lg border border-gray-700 space-y-6">
        <h2 className="text-2xl font-semibold text-cyan-300">Get in Touch</h2>
        <p className="text-gray-400">
          The best ways to contact the society leadership are via email or through our official Discord server.
        </p>
        <div>
          <h3 className="text-lg font-medium text-cyan-400 mb-1">Email (President)</h3>
          <a href="mailto:hul22001@byui.edu" className="text-gray-200 hover:text-cyan-300 transition-colors text-lg break-all">
            hul22001@byui.edu
          </a>
        </div>
        <div>
          <h3 className="text-lg font-medium text-cyan-400 mb-2">Discord Server</h3>
          <Link
            href={inviteLink}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block text-center bg-purple-600 hover:bg-purple-500 text-white font-bold py-2 px-5 rounded-md transition duration-300 shadow-md hover:shadow-lg shadow-purple-500/30 text-base"
          >
            Join Discord Server
          </Link>
           <p className="text-sm text-gray-500 mt-2">You can find the leadership active on the server.</p>
        </div>
        {/* Removed the contact form section */}
      </div>
    </div>
  );
} 