import React, { useRef, useEffect } from 'react';
import { motion, useSpring, useTransform } from 'framer-motion';

interface InfiniteScrollProps<T> {
  items: T[];
  children: (item: T) => React.ReactNode;
  itemWidth: number;
  gap: number;
  speed?: number;
}

function InfiniteScroll<T>({ items, children, itemWidth, gap, speed = 600 }: InfiniteScrollProps<T>) {
  const containerRef = useRef<HTMLDivElement>(null);
  const isHovered = useRef(false);

  const baseX = useSpring(0, {
    stiffness: 40,
    damping: 30,
  });

  const x = useTransform(baseX, (value) => {
    if (!containerRef.current) return value;
    const containerWidth = containerRef.current.offsetWidth;
    const contentWidth = (itemWidth + gap) * items.length;
    
    // Ensure smooth looping
    if (Math.abs(value) >= contentWidth) {
      baseX.set(0);
      return 0;
    }
    return value;
  });

  useEffect(() => {
    let timeoutId: NodeJS.Timeout;
    let animationFrameId: number;
    let lastTime = performance.now();

    const animate = (currentTime: number) => {
      if (!isHovered.current) {
        const deltaTime = currentTime - lastTime;
        const pixelsPerSecond = speed;
        const pixelsToMove = (pixelsPerSecond * deltaTime) / 1000;
        
        baseX.set(baseX.get() - pixelsToMove);
      }
      lastTime = currentTime;
      animationFrameId = requestAnimationFrame(animate);
    };

    const startAnimation = () => {
      lastTime = performance.now();
      animationFrameId = requestAnimationFrame(animate);
    };

    timeoutId = setTimeout(startAnimation, 0);

    return () => {
      clearTimeout(timeoutId);
      cancelAnimationFrame(animationFrameId);
    };
  }, [baseX, speed]);

  // Double the items to create seamless loop
  const displayItems = [...items, ...items];

  return (
    <div className="relative" ref={containerRef}>
      <div className="absolute left-0 top-0 w-20 h-full bg-gradient-to-r from-gray-50 to-transparent z-10" />
      <div className="absolute right-0 top-0 w-20 h-full bg-gradient-to-l from-gray-50 to-transparent z-10" />
      
      <motion.div
        style={{ x }}
        className="flex"
        onMouseEnter={() => { isHovered.current = true }}
        onMouseLeave={() => { isHovered.current = false }}
      >
        {displayItems.map((item, index) => (
          <div
            key={`${index}`}
            className="flex-none"
            style={{ marginRight: `${gap}px`, width: `${itemWidth}px` }}
          >
            {children(item)}
          </div>
        ))}
      </motion.div>
    </div>
  );
}

export default InfiniteScroll;