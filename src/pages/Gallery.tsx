import React from 'react';
import { motion } from 'framer-motion';
import Masonry from 'react-masonry-css';

const images = [
  {
    src: 'https://images.unsplash.com/photo-1540962351504-03099e0a754b',
    title: 'Aviation Training',
  },
  {
    src: 'https://images.unsplash.com/photo-1606185540834-d6e7483ee1a4',
    title: 'Hospitality Service',
  },
  {
    src: 'https://images.unsplash.com/photo-1521737711867-e3b97375f902',
    title: 'Classroom Training',
  },
  {
    src: 'https://images.unsplash.com/photo-1587019158091-1a103c5dd17f',
    title: 'Practical Sessions',
  },
  {
    src: 'https://images.unsplash.com/photo-1530521954074-e64f6810b32d',
    title: 'Student Life',
  },
  {
    src: 'https://images.unsplash.com/photo-1559599076-9c61d8e1b77c',
    title: 'Campus Events',
  },
];

const Gallery = () => {
  const breakpointColumns = {
    default: 3,
    1100: 3,
    700: 2,
    500: 1,
  };

  return (
    <div className="pt-20">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="container mx-auto px-4 py-12"
      >
        <h1 className="text-4xl font-bold text-center mb-12">Our Gallery</h1>

        <Masonry
          breakpointCols={breakpointColumns}
          className="flex -ml-4 w-auto"
          columnClassName="pl-4 bg-clip-padding"
        >
          {images.map((image, index) => (
            <motion.div
              key={image.src}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="mb-4"
            >
              <div className="relative overflow-hidden rounded-lg group">
                <img
                  src={image.src}
                  alt={image.title}
                  className="w-full h-auto transition-transform duration-300 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 transition-opacity duration-300 flex items-center justify-center">
                  <p className="text-white text-lg font-semibold opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    {image.title}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </Masonry>
      </motion.div>
    </div>
  );
};

export default Gallery;