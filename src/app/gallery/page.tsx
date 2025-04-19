// Removed 'use client';

import React from 'react';
// import Image from 'next/image'; // Removed unused import
import fs from 'fs'; // Can use fs now
import path from 'path'; // Can use path now
// Removed useState, motion, AnimatePresence imports

import GalleryClient from '@/components/GalleryClient'; // Import the new client component

interface GalleryImage {
  id: number; // Use index as ID for simplicity here
  src: string;
  alt: string;
}

// Function to read image filenames and apply pagination (Runs on Server)
const getGalleryImages = (page: number, limit: number): { images: GalleryImage[], totalPages: number } => {
  const galleryDirectory = path.join(process.cwd(), 'public/images/gallery');
  try {
    if (!fs.existsSync(galleryDirectory)) {
      console.warn(`Gallery directory not found: ${galleryDirectory}`);
      return { images: [], totalPages: 0 };
    }
    const filenames = fs.readdirSync(galleryDirectory)
                      .filter(file => /\.(jpg|jpeg|png|gif|webp)$/i.test(file)); // Ensure only images
                      // Optional: Sort filenames if order matters (e.g., by name, date modified)
                      // filenames.sort(); 

    const totalImages = filenames.length;
    const totalPages = Math.ceil(totalImages / limit);
    const startIndex = (page - 1) * limit;
    const endIndex = startIndex + limit;

    const paginatedFilenames = filenames.slice(startIndex, endIndex);

    const images = paginatedFilenames.map((filename, index) => ({
      // Calculate a unique ID based on page and index within page if needed, 
      // but using the overall index from the slice is simpler for layoutId
      id: startIndex + index, 
      src: `/images/gallery/${filename}`,
      alt: `Gallery image ${startIndex + index + 1}` // Alt text reflecting overall index
    }));

    return { images, totalPages };

  } catch (error) {
    console.error('Error reading gallery directory:', error);
    return { images: [], totalPages: 0 };
  }
};

// Define a specific Props type
type Props = {
  searchParams?: { [key: string]: string | string[] | undefined };
};

// Use the Props type
export default function GalleryPage({ searchParams }: Props) {
  const currentPage = typeof searchParams?.page === 'string' ? parseInt(searchParams.page, 10) : 1;
  const limit = 20; // Images per page

  // Fetch images for the current page on the server
  const { images, totalPages } = getGalleryImages(currentPage, limit);

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-6 text-cyan-400">Gallery</h1>
      <p className="text-lg text-gray-300 mb-10">
        A glimpse into our society&apos;s events, workshops, and activities.
        {totalPages === 0 && " (Gallery directory is empty or not found - add images to /public/images/gallery/)"}
      </p>

      {/* Render the Client Component, passing image data and pagination info */}
      <GalleryClient 
        galleryItems={images} 
        currentPage={currentPage} 
        totalPages={totalPages} 
      />
    </div>
  );
} 