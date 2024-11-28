import React from 'react';
import { useIntersectionObserver } from '../../hooks/useIntersectionObserver';

interface FadeInSectionProps {
  children: React.ReactNode;
  className?: string;
}

const FadeInSection: React.FC<FadeInSectionProps> = ({ children, className = '' }) => {
  const { elementRef, isVisible } = useIntersectionObserver();

  return (
    <div
      ref={elementRef}
      className={`fade-in-section ${isVisible ? 'is-visible' : ''} ${className}`}
    >
      {children}
    </div>
  );
};

export default FadeInSection;