import { useState, useEffect } from 'react';
import { fetchTestimonials } from '../../services/api';

interface Testimonial {
  _id: string;
  name: string;
  role: string;
  image: string;
  description: string;
  isLocal: boolean;
}

const useTestimonials = () => {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [isLoading, setIsLoading] = useState(true);

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

  return { testimonials, isLoading };
};

export default useTestimonials;