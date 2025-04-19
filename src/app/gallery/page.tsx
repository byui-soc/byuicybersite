// Removed 'use client';

import React from 'react';
// import Image from 'next/image'; // Removed unused import
import fs from 'fs'; // Can use fs now
import path from 'path'; // Can use path now
// Removed useState, motion, AnimatePresence imports

import GalleryClient from '@/components/GalleryClient'; // Import the new client component

interface GalleryImage {
  id: number;
  src: string;
  alt: string;
}

// Function to read image filenames (Runs on Server)
const getGalleryImages = (): GalleryImage[] => {
  const galleryDirectory = path.join(process.cwd(), 'public/images/gallery');
  try {
    // Ensure directory exists before reading
    if (!fs.existsSync(galleryDirectory)) {
        console.warn(`Gallery directory not found: ${galleryDirectory}`);
        return [];
    }
    const filenames = fs.readdirSync(galleryDirectory);
    const imageFiles = filenames.filter(file => /\.(jpg|jpeg|png|gif|webp)$/i.test(file));
    return imageFiles.map((filename, index) => ({
      id: index + 1,
      src: `/images/gallery/${filename}`,
      alt: `Gallery image ${index + 1}`
    }));
  } catch (error) {
    console.error('Error reading gallery directory:', error);
    return [];
  }
};


export default function GalleryPage() {
  // Fetch images on the server
  const galleryItems = getGalleryImages();

  // Removed state and handlers

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-6 text-cyan-400">Gallery</h1>
      <p className="text-lg text-gray-300 mb-10">
        A glimpse into our society's events, workshops, and activities.
        {galleryItems.length === 0 && " (Gallery directory is empty or not found - add images to /public/images/gallery/)"}
      </p>

      {/* Render the Client Component, passing image data as props */}
      <GalleryClient galleryItems={galleryItems} />

  


    </div>
  );
} 