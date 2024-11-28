import React from 'react';
import Hero from '../components/home/Hero';
import Intro from '../components/home/Intro';
import MissionVision from '../components/home/MissionVision';
import Stats from '../components/home/Stats';
import About from '../components/home/About';
import Testimonials from '../components/home/Testimonials';
import CompanyLogos from '../components/home/CompanyLogos';
import FadeInSection from '../components/home/FadeInSection';

const Home = () => {
  return (
    <div className="overflow-hidden">
      <Hero />
      <FadeInSection>
        <Intro />
      </FadeInSection>
      <FadeInSection>
        <MissionVision />
      </FadeInSection>
      <FadeInSection>
        <Stats />
      </FadeInSection>
      <FadeInSection>
        <About />
      </FadeInSection>
      <FadeInSection>
        <Testimonials />
      </FadeInSection>
      <FadeInSection>
        <CompanyLogos />
      </FadeInSection>
    </div>
  );
};

export default Home;