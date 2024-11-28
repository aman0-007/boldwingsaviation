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
    content: 'https://player.vimeo.com/video/517031489?background=1&autoplay=1&loop=1&byline=0&title=0',
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
  return (
    <div className="pt-20">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="container mx-auto px-4 py-12"
      >
        <h1 className="text-5xl font-bold text-center mb-12 gradient-text">Life at BoldWings</h1>

        <div className="space-y-16">
          {lifeContent.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
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
                    src={item.content}
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
      </motion.div>
    </div>
  );
};

export default Life;