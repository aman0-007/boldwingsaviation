import { useState, useEffect } from 'react';
import axios from 'axios';
import { Testimonial } from '../types/testimonial';

const useTestimonials = () => {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchTestimonials = async () => {
      try {
        const response = await axios.get('http://localhost:3000/api/testimonials');
        setTestimonials(response.data);
      } catch (error) {
        console.error('Failed to fetch testimonials:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchTestimonials();
  }, []);

  return { testimonials, isLoading };
};

export default useTestimonials;