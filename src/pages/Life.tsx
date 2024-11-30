import React from 'react';
import { motion } from 'framer-motion';

const lifeContent = [
  {
    type: 'image',
    content: 'https://images.unsplash.com/photo-1523240795612-9a054b0db644',
    caption: 'Creating Future Leaders',
  },
  {
    type: 'quote',
    content: '"Life at BoldWings is not just about learning; it\'s about transforming dreams into reality."',
    author: 'Student Ambassador',
  },
  {
    type: 'video',
    content: 'https://youtu.be/ANjsz-SthJQ',  // Corrected YouTube URL (no '?si=...')
    caption: 'A Day in the Life at BoldWings',
  },
  {
    type: 'image',
    content: 'https://images.unsplash.com/photo-1524178232363-1fb2b075b655',
    caption: 'Hands-on Training Sessions',
  },
  {
    type: 'quote',
    content: '"The practical exposure and industry connections we get here are unmatched. BoldWings truly prepares us for the real world."',
    author: 'Final Year Student',
  },
  {
    type: 'image',
    content: 'https://images.unsplash.com/photo-1517048676732-d65bc937f952',
    caption: 'Interactive Learning Environment',
  },
];

const Life = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: "easeOut"
      }
    }
  };

  // Function to extract YouTube video ID and format the embed URL
  const getEmbedUrl = (url) => {
    const match = url.match(/(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/(?:[^\/\n\s]+\/\S+\/|\S+\/|(?:\S+\?v=))|youtu\.be\/)([a-zA-Z0-9_-]+)/);
    if (match && match[1]) {
      return `https://www.youtube.com/embed/${match[1]}?autoplay=1`;
    }
    return ''; // Return an empty string if the URL is not valid
  };

  return (
    <motion.div 
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      className="pt-20"
    >
      <div className="container mx-auto px-4 py-12">
        <motion.h1
          variants={itemVariants}
          className="text-5xl font-bold text-center mb-12 gradient-text"
        >
          Life at BoldWings
        </motion.h1>

        <div className="space-y-16">
          {lifeContent.map((item, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              className="max-w-4xl mx-auto"
            >
              {item.type === 'image' && (
                <div className="rounded-lg overflow-hidden shadow-xl">
                  <img
                    src={item.content}
                    alt={item.caption}
                    className="w-full h-[500px] object-cover"
                  />
                  <div className="p-4 bg-white">
                    <p className="text-lg font-medium text-gray-800">{item.caption}</p>
                  </div>
                </div>
              )}

              {item.type === 'quote' && (
                <div className="text-center px-8 py-12 bg-gradient-to-r from-[#f9df54]/10 to-[#f8f260]/10 rounded-lg">
                  <p className="text-2xl italic text-gray-800 mb-4">{item.content}</p>
                  <p className="text-[#f9df54] font-medium">- {item.author}</p>
                </div>
              )}

              {item.type === 'video' && (
                <div className="rounded-lg overflow-hidden shadow-xl aspect-video">
                  <iframe
                    src={getEmbedUrl(item.content)}  // Use the embed URL function here
                    className="w-full h-full"
                    frameBorder="0"
                    allow="autoplay; fullscreen; picture-in-picture"
                    allowFullScreen
                  ></iframe>
                </div>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

export default Life;
