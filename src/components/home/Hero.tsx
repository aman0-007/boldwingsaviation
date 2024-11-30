import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const slides = [
  {
    image: "/logo.png",
    title: ["Bold", "Wings"],
    subtitle: "Where Dreams and Reality Links",
    colors: ["text-[#FFD700]", "text-[#C0C0C0]"],
    highlightWords: []
  },
  {
    image: "/hero2.jpg",
    title: ["Give Your", "Future"],
    subtitle: "Bold Wings in Aviation",
    colors: ["text-white", "text-[#FFD700]"],
    highlightWords: ["Bold", "Aviation"]
  },
  {
    image: "/hero3.jpg",
    title: ["Give Your", "Skills"],
    subtitle: "Bold Wings in Hospitality",
    colors: ["text-white", "text-[#FFD700]"],
    highlightWords: ["Bold", "Hospitality"]
  }
];

const Hero = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const highlightText = (text: string, highlightWords: string[]) => {
    if (highlightWords.length === 0) return text;
    
    return text.split(' ').map((word, index) => (
      <span
        key={index}
        className={highlightWords.includes(word) ? 'text-[#FFD700]' : ''}
      >
        {word}{' '}
      </span>
    ));
  };

  return (
    <div className="relative h-screen overflow-hidden">
      <AnimatePresence mode="wait">
        <motion.div
          key={currentSlide}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1 }}
          className="absolute inset-0"
        >
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: `url(${slides[currentSlide].image})` }}
          >
            <div className="absolute inset-0 bg-black/50" />
          </div>
          <div className="relative h-full flex items-center justify-center text-center">
            <div className="text-white">
              <motion.h1
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.4 }}
                className="text-5xl md:text-7xl font-bold mb-4"
              >
                <span className={slides[currentSlide].colors[0]}>
                  {slides[currentSlide].title[0]}{' '}
                </span>
                <span className={slides[currentSlide].colors[1]}>
                  {slides[currentSlide].title[1]}
                </span>
              </motion.h1>
              <motion.p
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.4, delay: 0.2 }}
                className="text-2xl md:text-3xl"
              >
                {highlightText(slides[currentSlide].subtitle, slides[currentSlide].highlightWords)}
              </motion.p>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

export default Hero;