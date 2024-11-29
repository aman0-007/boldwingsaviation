import React, { useRef, useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import useTestimonials from '../../hooks/useTestimonials';
import useInfiniteScroll from '../../hooks/useInfiniteScroll';
import TestimonialCard from './testimonials/TestimonialCard';
import SectionHeader from '../shared/SectionHeader';

const CARD_WIDTH = 400; // Width of each testimonial card
const CARD_GAP = 24; // Gap between cards (space-x-6 = 1.5rem = 24px)

const Testimonials = () => {
  const { testimonials, isLoading } = useTestimonials();
  const containerRef = useRef<HTMLDivElement>(null);
  const [containerWidth, setContainerWidth] = useState(0);

  useEffect(() => {
    if (containerRef.current && testimonials.length > 0) {
      const totalWidth = testimonials.length * (CARD_WIDTH + CARD_GAP);
      setContainerWidth(totalWidth);
    }
  }, [testimonials]);

  const { scrollX, isHovered } = useInfiniteScroll(containerWidth, 2);

  if (isLoading) {
    return (
      <div className="py-20 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#f9df54]"></div>
      </div>
    );
  }

  // Create a seamless loop by duplicating testimonials
  const duplicatedTestimonials = [...testimonials, ...testimonials, ...testimonials];

  return (
    <section className="py-20 bg-gray-50 overflow-hidden">
      <div className="container mx-auto px-4">
        <SectionHeader
          title="What Our Students Say"
          subtitle="Hear from our successful alumni about their journey with BoldWings"
        />

        <div className="relative mt-12">
          <div className="absolute left-0 top-0 w-20 h-full bg-gradient-to-r from-gray-50 to-transparent z-10" />
          <div className="absolute right-0 top-0 w-20 h-full bg-gradient-to-l from-gray-50 to-transparent z-10" />
          
          <div className="overflow-hidden">
            <motion.div
              ref={containerRef}
              style={{ x: scrollX }}
              className="flex space-x-6"
              onMouseEnter={() => isHovered.current = true}
              onMouseLeave={() => isHovered.current = false}
            >
              {duplicatedTestimonials.map((testimonial, index) => (
                <TestimonialCard
                  key={`${testimonial._id}-${index}`}
                  testimonial={testimonial}
                />
              ))}
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;