import React from 'react';
import { motion } from 'framer-motion';
import useTestimonials from '../../hooks/useTestimonials';
import TestimonialCard from './testimonials/TestimonialCard';

const Testimonials = () => {
  const { testimonials, isLoading } = useTestimonials();

  if (isLoading) {
    return (
      <div className="py-20 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#f9df54]"></div>
      </div>
    );
  }

  // Create three copies for seamless infinite scroll
  const duplicatedTestimonials = [...testimonials, ...testimonials, ...testimonials];

  return (
    <section className="py-20 bg-gray-50 overflow-hidden">
      <div className="container mx-auto px-4 mb-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          <h2 className="text-4xl font-bold mb-4">What Our Students Say</h2>
          <p className="text-gray-600">Hear from our successful alumni about their journey with BoldWings</p>
        </motion.div>
      </div>

      <div className="relative">
        <div className="absolute left-0 top-0 w-20 h-full bg-gradient-to-r from-gray-50 to-transparent z-10" />
        <div className="absolute right-0 top-0 w-20 h-full bg-gradient-to-l from-gray-50 to-transparent z-10" />
        
        <motion.div
          animate={{ x: [0, -50 + '%'] }}
          transition={{
            x: {
              repeat: Infinity,
              repeatType: "loop",
              duration: 40,
              ease: "linear",
            },
          }}
          className="flex items-center space-x-6 whitespace-nowrap"
        >
          {duplicatedTestimonials.map((testimonial, index) => (
            <TestimonialCard
              key={`${testimonial._id}-${index}`}
              testimonial={testimonial}
            />
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Testimonials;