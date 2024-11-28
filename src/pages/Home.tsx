import React from 'react';
import Hero from '../components/home/Hero';
import MissionVision from '../components/home/MissionVision';
import Stats from '../components/home/Stats';
import About from '../components/home/About';
import Testimonials from '../components/home/Testimonials';
import CompanyLogos from '../components/home/CompanyLogos';

const Home = () => {
  return (
    <div className="overflow-hidden">
      <Hero />
      <MissionVision />
      <Stats />
      <About />
      <Testimonials />
      <CompanyLogos />
    </div>
  );
};

export default Home;