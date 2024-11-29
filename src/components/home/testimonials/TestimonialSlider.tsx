import React, { useRef, useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import TestimonialCard from './TestimonialCard';
import { Testimonial } from '../../../types/testimonial';
import useInfiniteScroll from '../../../hooks/useInfiniteScroll';

interface TestimonialSliderProps {
  testimonials: Testimonial[];
}

const CARD_WIDTH = 400;
const CARD_GAP = 24;

const TestimonialSlider: React.FC<TestimonialSliderProps> = ({ testimonials }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [containerWidth, setContainerWidth] = useState(0);

  useEffect(() => {
    if (containerRef.current && testimonials.length > 0) {
      const totalWidth = testimonials.length * (CARD_WIDTH + CARD_GAP);
      setContainerWidth(totalWidth);
    }
  }, [testimonials]);

  const { scrollX, isHovered } = useInfiniteScroll(containerWidth, 1);

  // Create a seamless loop by duplicating testimonials
  const duplicatedTestimonials = [...testimonials, ...testimonials, ...testimonials];

  return (
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
  );
};

export default TestimonialSlider;