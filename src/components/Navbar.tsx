'use client'; // Needed for using usePathname

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React from 'react';
import Image from 'next/image'; // Import Image component

const navLinks = [
  { name: 'Home', href: '/' },
  { name: 'About', href: '/about' },
  { name: 'Resources', href: '/resources' },
  { name: 'Gallery', href: '/gallery' },
  { name: 'Join', href: '/join' },
  { name: 'Contact', href: '/contact' },
];

export default function Navbar() {
  const pathname = usePathname();

  return (
    <nav className="bg-gray-900/50 backdrop-blur-sm p-4 sticky top-0 z-50 mb-8 border-b border-cyan-700/50">
      <div className="container mx-auto flex justify-between items-center">
        <Link href="/" className="flex items-center gap-3 text-xl font-bold text-cyan-400 hover:text-cyan-300 transition-colors">
          <Image
            src="/images/logo.png" // Updated path relative to /public
            alt="BYU-I Society of Cybersecurity Logo"
            width={40} // Adjust size as needed
            height={40}
            className="invert brightness-0" // Invert white logo for visibility on light backgrounds if needed, adjust as theme evolves
          />
          <span className="hidden sm:inline">BYU-I SoC</span> {/* Show text on larger screens */}
        </Link>
        <ul className="flex space-x-4 md:space-x-6">
          {navLinks.map((link) => {
            const isActive = pathname === link.href;
            return (
              <li key={link.name}>
                <Link
                  href={link.href}
                  className={`text-base md:text-lg ${
                    isActive
                      ? 'text-cyan-300 font-semibold border-b-2 border-cyan-400'
                      : 'text-gray-300 hover:text-cyan-400 transition-colors'
                  }`}
                >
                  {link.name}
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    </nav>
  );
} 