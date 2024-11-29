export interface Testimonial {
    _id: string;
    name: string;
    role: string;
    image: string;
    description: string;
    isLocal: boolean;
  }
  
  export interface TestimonialCardProps {
    testimonial: Testimonial;
  }