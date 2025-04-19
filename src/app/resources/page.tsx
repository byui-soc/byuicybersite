'use client'; // Needed for motion components if we add whileHover

import React from 'react';
import { motion } from 'framer-motion';

// Define resource data structure
interface Resource {
  name: string;
  url: string;
  description: string;
}

// Placeholder resource data - replace or add actual resources
const resources: Resource[] = [
  {
    name: 'BYU-I SOC GitHub',
    url: 'https://github.com/byui-soc',
    description: "Our organization's code repositories and projects.",
  },
  {
    name: 'Hack The Box',
    url: 'https://www.hackthebox.com/',
    description: 'A popular platform for hands-on cybersecurity training and challenges.',
  },
  {
    name: 'TryHackMe',
    url: 'https://tryhackme.com/',
    description: 'Another excellent platform for learning cybersecurity through interactive labs.',
  },
  {
    name: 'OWASP Top Ten',
    url: 'https://owasp.org/www-project-top-ten/',
    description: 'A standard awareness document for developers and web application security.',
  },
  // Add more resources here
];

export default function ResourcesPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-6 text-cyan-400">Resources</h1>
      <p className="text-lg text-gray-300 mb-10 max-w-3xl">
        Here are some useful links and resources for cybersecurity learning and development:
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {resources.map((resource) => (
          <motion.a
            key={resource.name}
            href={resource.url}
            target="_blank" // Open external links in new tab
            rel="noopener noreferrer" // Security best practice for external links
            className="block p-6 bg-gray-800/50 rounded-lg shadow-lg border border-gray-700 
                       hover:border-cyan-600 hover:bg-gray-700/60 
                       hover:shadow-cyan-500/40 hover:shadow-[0_0_15px_3px] /* Cyan glow on hover */
                       transition-all duration-300 group"
          >
            <h3 className="text-xl font-semibold text-cyan-300 mb-2 group-hover:text-cyan-200 transition-colors">{resource.name}</h3>
            <p className="text-gray-400 group-hover:text-gray-300 transition-colors">{resource.description}</p>
            <span className="inline-block mt-3 text-sm text-cyan-500 group-hover:text-cyan-400 transition-colors">
              Visit Site →
            </span>
          </motion.a>
        ))}
      </div>
    </div>
  );
} 