import React, { useState, useEffect } from 'react';
import { motion, useAnimation } from 'framer-motion';
import { Quote } from 'lucide-react';
import { fetchTestimonials } from '../services/api';

interface Testimonial {
  _id: string;
  name: string;
  role: string;
  image: string;
  description: string;
  isLocal: boolean;
}

const Testimonials = () => {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isHovered, setIsHovered] = useState(false);
  const controls = useAnimation();

  useEffect(() => {
    const loadTestimonials = async () => {
      try {
        const data = await fetchTestimonials();
        setTestimonials(data);
      } catch (error) {
        console.error('Failed to fetch testimonials:', error);
      } finally {
        setIsLoading(false);
      }
    };

    loadTestimonials();
  }, []);

  useEffect(() => {
    if (!isHovered && testimonials.length > 0) {
      controls.start({
        x: [0, -50 + '%'],
        transition: {
          x: {
            repeat: Infinity,
            repeatType: "loop",
            duration: 30,
            ease: "linear",
          },
        },
      });
    } else {
      controls.stop();
    }
  }, [isHovered, controls, testimonials]);

  if (isLoading) {
    return (
      <div className="py-20 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#f9df54]"></div>
      </div>
    );
  }

  // Duplicate testimonials for infinite scroll
  const duplicatedTestimonials = [...testimonials, ...testimonials];

  return (
    <section className="py-20 bg-gray-50 overflow-hidden">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl font-bold mb-4">What Our Students Say</h2>
          <p className="text-gray-600">Hear from our successful alumni about their journey with BoldWings</p>
        </motion.div>

        <div className="relative">
          <div className="absolute left-0 top-0 w-20 h-full bg-gradient-to-r from-gray-50 to-transparent z-10" />
          <div className="absolute right-0 top-0 w-20 h-full bg-gradient-to-l from-gray-50 to-transparent z-10" />
          
          <motion.div
            animate={controls}
            className="flex space-x-6"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
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