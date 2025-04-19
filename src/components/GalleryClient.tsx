'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';

interface GalleryImage {
  id: number;
  src: string;
  alt: string;
}

interface GalleryClientProps {
  galleryItems: GalleryImage[];
}

const GalleryClient: React.FC<GalleryClientProps> = ({ galleryItems }) => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const openLightbox = (src: string) => {
    setSelectedImage(src);
  };

  const closeLightbox = () => {
    setSelectedImage(null);
  };

  return (
    <>
      {galleryItems.length > 0 ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {galleryItems.map((item) => (
            <motion.div
              key={item.id}
              className="relative aspect-square rounded-lg overflow-hidden border-2 border-gray-700 hover:border-cyan-500 transition-colors duration-300 shadow-lg group cursor-pointer"
              onClick={() => openLightbox(item.src)}
              layoutId={`gallery-image-${item.id}`}
              whileHover={{ scale: 1.03 }}
            >
              <Image
                src={item.src}
                alt={item.alt}
                fill
                sizes="(max-width: 640px) 50vw, (max-width: 768px) 33vw, (max-width: 1024px) 25vw, 20vw"
                className="object-cover"
              />
            </motion.div>
          ))}
        </div>
      ) : (
        <p className="text-center text-gray-500 text-xl py-10">No images found in the gallery.</p>
      )}

      {/* Lightbox Modal using AnimatePresence */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeLightbox}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-[60] p-4 cursor-pointer"
          >
            <motion.div
              layoutId={`gallery-image-${galleryItems.find(item => item.src === selectedImage)?.id}`}
              onClick={(e) => e.stopPropagation()}
              className="relative max-w-[90vw] max-h-[85vh] flex"
            >
              <Image
                src={selectedImage}
                alt="Enlarged gallery image"
                width={1200}
                height={800}
                style={{ width: 'auto', height: 'auto', maxWidth: '100%', maxHeight: '100%' }}
                className="object-contain rounded-lg shadow-2xl"
              />
            </motion.div>
            <button
              onClick={closeLightbox}
              className="absolute top-5 right-5 text-white text-4xl hover:text-cyan-300 transition-colors"
              aria-label="Close enlarged image view"
            >
              &times;
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default GalleryClient; 