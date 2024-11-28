import { useRef, useEffect } from 'react';
import { useSpring } from 'framer-motion';

const useInfiniteScroll = () => {
  const isHovered = useRef(false);
  const scrollX = useSpring(0, {
    stiffness: 50,
    damping: 30,
  });

  useEffect(() => {
    let timeoutId: NodeJS.Timeout;

    const animate = () => {
      if (!isHovered.current) {
        scrollX.set((prev) => {
          const next = prev - 1;
          return next <= -50 ? 0 : next;
        });
      }
      timeoutId = setTimeout(animate, 16);
    };

    animate();
    return () => clearTimeout(timeoutId);
  }, [scrollX]);

  return { scrollX, isHovered };
};

export default useInfiniteScroll;