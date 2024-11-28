import React from 'react';
import { motion } from 'framer-motion';
import { Quote } from 'lucide-react';
import useTestimonials from '../hooks/useTestimonials';
import useInfiniteScroll from '../hooks/useInfiniteScroll';

const Testimonials = () => {
  const { testimonials, isLoading } = useTestimonials();
  const { scrollX, isHovered } = useInfiniteScroll();

  if (isLoading) {
    return (
      <div className="py-20 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#f9df54]"></div>
      </div>
    );
  }

  const duplicatedTestimonials = [...testimonials, ...testimonials];

  return (
    <section className="py-20 bg-gray-50 overflow-hidden">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl font-bold mb-4">What Our Students Say</h2>
          <p className="text-gray-600">Hear from our successful alumni about their journey with BoldWings</p>
        </motion.div>

        <div className="relative">
          <div className="absolute left-0 top-0 w-20 h-full bg-gradient-to-r from-gray-50 to-transparent z-10" />
          <div className="absolute right-0 top-0 w-20 h-full bg-gradient-to-l from-gray-50 to-transparent z-10" />
          
          <motion.div
            style={{ x: scrollX }}
            className="flex space-x-6"
            onMouseEnter={() => isHovered.current = true}
            onMouseLeave={() => isHovered.current = false}
          >
            {duplicatedTestimonials.map((testimonial, index) => (
              <motion.div
                key={`${testimonial._id}-${index}`}
                className="flex-none w-[400px] bg-white rounded-lg p-6 shadow-lg relative"
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.2 }}
              >
                <Quote className="absolute top-4 right-4 h-8 w-8 text-[#f9df54]/30" />
                <div className="flex items-center mb-4">
                  <img
                    src={testimonial.isLocal ? `http://localhost:3000${testimonial.image}` : testimonial.image}
                    alt={testimonial.name}
                    className="w-16 h-16 rounded-full object-cover mr-4"
                  />
                  <div>
                    <h3 className="font-semibold text-lg">{testimonial.name}</h3>
                    <p className="text-[#f9df54]">{testimonial.role}</p>
                  </div>
                </div>
                <p className="text-gray-600 italic">{testimonial.description}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;