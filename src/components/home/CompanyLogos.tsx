import React from 'react';
import { motion, useAnimationControls } from 'framer-motion';

const companies = [
  { name: 'Vistara', logo: '/logos/Vistara-Logo.wine.svg' },
  { name: 'IndiGo', logo: '/logos/indigo-vector-logo-2022.svg' },
  { name: 'Air France', logo: '/logos/Air_France_Logo.svg' },
  { name: 'Akasha Air', logo: '/logos/akasha air.jpg' },
  { name: 'Celebi', logo: '/logos/celebi.png' },
  { name: 'Digiyatra', logo: '/logos/digiyatra.png' },
  { name: 'Fern', logo: '/logos/fern.svg' },
  { name: 'ITC', logo: '/logos/ITC_Limited_Logo.svg' },
  { name: 'BWFS', logo: '/logos/logo.webp' },
  { name: 'Lufthansa', logo: '/logos/Lufthansa_Logo_2018.svg' },
  { name: 'Planet Hollywood', logo: '/logos/Planet_Hollywood_logo.svg' },
  { name: 'Taj Hotel', logo: '/logos/Taj_Hotels_logo.svg' },
];

const CompanyLogos = () => {
  const controls = useAnimationControls();

  React.useEffect(() => {
    controls.start({
      x: [0, -100 + '%'],
      transition: {
        x: {
          repeat: Infinity,
          repeatType: "loop",
          duration: 90,
          ease: "linear",
        },
      },
    });
  }, [controls]);

  return (
    <section className="py-20 bg-white overflow-hidden">
      <div className="container mx-auto px-4 mb-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          <h2 className="text-4xl font-bold mb-4">Our Students Work At</h2>
          <p className="text-gray-600">Leading airlines trust BoldWings graduates</p>
        </motion.div>
      </div>

      <div className="relative">
        <div className="absolute left-0 top-0 w-20 h-full bg-gradient-to-r from-white to-transparent z-10" />
        <div className="absolute right-0 top-0 w-20 h-full bg-gradient-to-l from-white to-transparent z-10" />
        
        <div className="flex overflow-hidden">
          <motion.div
            animate={controls}
            className="flex space-x-8 min-w-max"
          >
            {[...companies, ...companies, ...companies].map((company, index) => (
              <div
                key={`${company.name}-${index}`}
                className="flex items-center justify-center h-28 w-56"
              >
                <img
                  src={company.logo}
                  alt={company.name}
                  className="max-h-20 max-w-full object-contain grayscale hover:grayscale-0 transition-all duration-600"
                />
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default CompanyLogos;