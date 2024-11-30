import React from 'react';
import { motion } from 'framer-motion';
import { Quote } from 'lucide-react';

interface TestimonialCardProps {
  testimonial: {
    _id: string;
    name: string;
    role: string;
    image: string;
    description: string;
    isLocal: boolean;
  };
}

const TestimonialCard: React.FC<TestimonialCardProps> = ({ testimonial }) => {
  return (
    <motion.div
      className="flex-none w-[400px] bg-white rounded-lg p-6 shadow-lg relative flex flex-col h-[230px]"
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
          {/* <p className="text-[#f9df54]">{testimonial.role}</p> */}
        </div>
      </div>
      <div className="flex-grow overflow-y-auto">
        <p className="text-gray-600 italic whitespace-normal break-words line-clamp-6 hover:line-clamp-none">
          {testimonial.description}
        </p>
      </div>
    </motion.div>
  );
};

export default TestimonialCard;