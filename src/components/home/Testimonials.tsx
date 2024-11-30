import React from 'react';
import { motion } from 'framer-motion';
import { Quote } from 'lucide-react';
import useTestimonials from '../../hooks/useTestimonials';
import TestimonialCard from './TestimonialCard';
import InfiniteScroll from '../shared/InfiniteScroll';

const Testimonials = () => {
  const { testimonials, isLoading } = useTestimonials();

  if (isLoading) {
    return (
      <div className="py-20 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#f9df54]"></div>
      </div>
    );
  }

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

        <InfiniteScroll items={testimonials} itemWidth={400} gap={24}>
          {(testimonial) => (
            <TestimonialCard testimonial={testimonial} />
          )}
        </InfiniteScroll>
      </div>
    </section>
  );
};

export default Testimonials;