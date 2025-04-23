'use client'; // Need motion

import Image from "next/image";
import { motion } from 'framer-motion'; // Import motion

export default function HomePage() {
  return (
    <div className="container mx-auto px-4 pt-8 pb-16 text-center">
      <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-purple-500">
        Welcome to the BYU-I Society of Cybersecurity
      </h1>
      <p className="text-xl md:text-2xl text-gray-300 mb-12 max-w-3xl mx-auto">
        Your hub for all things cybersecurity. Explore resources, connect with peers, and stay up to date with our events.
      </p>
      <p className="text-xl md:text-2xl text-gray-300 mb-4 max-w-3xl mx-auto"> Upcoming Event:</p>
      {/* Event Poster Section */}
      <div className="relative w-full max-w-3xl mx-auto mb-12 shadow-xl shadow-purple-500/20 rounded-lg overflow-hidden border border-purple-700/50 aspect-video">
         {/* Changed aspect ratio based on typical poster dimensions, adjust if needed */}
         <Image
            src="/images/nextevent.png" // Use the nextevent file from public/images
            alt="BYU-I Society of Cybersecurity Upcoming Event Poster"
            fill // Use fill to cover the container
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 75vw, 66vw" // Help optimize loading
            className="object-contain" // Use object-contain if you don't want cropping, object-cover if cropping is okay
            priority // Load this image eagerly as it's important
         />
      </div>

      <div className="space-x-4">
        <motion.a
          href="/about"
          className="inline-block bg-cyan-600 hover:bg-cyan-500 text-white font-bold py-3 px-8 rounded-full transition duration-300 text-lg shadow-lg shadow-cyan-500/30"
          whileHover={{ scale: 1.05, y: -3 }}
          transition={{ type: 'spring', stiffness: 300 }}
        >
          Learn More
        </motion.a>
        <motion.a
          href="/contact"
          className="inline-block bg-gray-700 hover:bg-gray-600 text-gray-200 font-bold py-3 px-8 rounded-full transition duration-300 text-lg"
          whileHover={{ scale: 1.05, y: -3 }}
          transition={{ type: 'spring', stiffness: 300 }}
        >
          Get Involved
        </motion.a>
      </div>
    </div>
  );
}
