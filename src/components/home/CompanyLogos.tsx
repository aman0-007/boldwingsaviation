import React from 'react';
import { motion } from 'framer-motion';
import useInfiniteScroll from '../hooks/useInfiniteScroll';

const companies = [
  { name: 'Vistara', logo: 'public\\logos\\Vistara-Logo.wine.svg' },
  { name: 'IndiGo', logo: 'public\\logos\\indigo-vector-logo-2022.svg' },
  { name: 'Air France', logo: 'public\\logos\\Air_France_Logo.svg' },
  { name: 'Akasha Air', logo: 'public\\logos\\akasha air.jpg' },
  { name: 'Celebi', logo: 'public\\logos\\celebi.png' },
  { name: 'Digiyatra', logo: 'public\\logos\\digiyatra.png' },
  { name: 'Fern', logo: 'public\\logos\\fern.svg' },
  { name: 'ITC', logo: 'public\\logos\\ITC_Limited_Logo.svg' },
  { name: 'BWFS', logo: 'public\\logos\\logo.webp' },
  { name: 'Lufthansa', logo: 'public\\logos\\Lufthansa_Logo_2018.svg' },
  { name: 'Planet Hollywood', logo: 'public\\logos\\Planet_Hollywood_logo.svg' },
  { name: 'Taj Hotel', logo: 'public\\logos\\Taj_Hotels_logo.svg' },
];

const CompanyLogos = () => {
  const { scrollX, isHovered } = useInfiniteScroll();

  return (
    <section className="py-20 bg-white overflow-hidden">
      <div className="container mx-auto px-4 mb-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="text-center"
        >
          <h2 className="text-4xl font-bold mb-4">Our Students Work At</h2>
          <p className="text-gray-600">Leading airlines trust BoldWings graduates</p>
        </motion.div>
      </div>

      <div className="relative">
        <div className="absolute left-0 top-0 w-20 h-full bg-gradient-to-r from-white to-transparent z-10" />
        <div className="absolute right-0 top-0 w-20 h-full bg-gradient-to-l from-white to-transparent z-10" />
        
        <motion.div
          style={{ x: scrollX }}
          className="flex items-center space-x-6 whitespace-nowrap"
          onMouseEnter={() => isHovered.current = true}
          onMouseLeave={() => isHovered.current = false}
        >
          {[...companies].map((company, index) => (
            <div
              key={`${company.name}-${index}`}
              className="flex items-center justify-center h-28 w-56"
            >
              <img
                src={company.logo}
                alt={company.name}
                className="max-h-20 max-w-full object-contain grayscale hover:grayscale-0 transition-all duration-300"
              />
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default CompanyLogos;