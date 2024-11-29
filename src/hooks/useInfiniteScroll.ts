import { useRef, useEffect } from 'react';
import { useSpring } from 'framer-motion';

const useInfiniteScroll = (containerWidth: number = 0, speed: number = 1) => {
  const isHovered = useRef(false);
  const scrollX = useSpring(0, {
    stiffness: 50,
    damping: 30,
  });

  useEffect(() => {
    let timeoutId: NodeJS.Timeout;
    let startTime = Date.now();

    const animate = () => {
      if (!isHovered.current && containerWidth > 0) {
        const currentTime = Date.now();
        const deltaTime = currentTime - startTime;
        startTime = currentTime;

        scrollX.set((prev) => {
          const next = prev - speed * (deltaTime / 16);
          // Reset position when scrolled one container width to create seamless loop
          return next <= -containerWidth / 3 ? 0 : next;
        });
      }
      timeoutId = setTimeout(animate, 16);
    };

    animate();
    return () => clearTimeout(timeoutId);
  }, [scrollX, containerWidth, speed]);

  return { scrollX, isHovered };
};

export default useInfiniteScroll;