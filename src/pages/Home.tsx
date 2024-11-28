import React from 'react';
import Hero from '../components/Hero';
import MissionVision from '../components/MissionVision';
import Stats from '../components/Stats';
import About from '../components/About';
import Testimonials from '../components/Testimonials';
import CompanyLogos from '../components/CompanyLogos';

const Home = () => {
  return (
    <>
      <Hero />
      <MissionVision />
      <Stats />
      <About />
      <Testimonials />
      <CompanyLogos />
    </>
  );
};

export default Home;
