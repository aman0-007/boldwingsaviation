import React from 'react';
import { motion } from 'framer-motion';

const About = () => {
  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center gap-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="md:w-1/2"
          >
            <img
              src="aboutus.jpg"
              alt="About BoldWings"
              className="rounded-lg shadow-lg w-full"
            />
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.2 }}
            className="md:w-1/2"
          >
            <h2 className="text-4xl font-bold mb-6 text-gray-800">About Us</h2>
            <p className="text-gray-600 mb-6">
              Bold Wings is a leading institute offering industry-relevant training in aviation, hospitality, and customer service. Founded in 2023 by Anju Gupta, the institute is led by experienced professionals like Meenakshi Ramteke and Priyanka Hotkar. With over 25 years of combined experience, our team is dedicated to empowering students with the skills, knowledge, and ethical values needed for lifelong success.
            </p>
            <p className="text-gray-600">
              We provide hands-on learning, foster creativity, and build strong industry partnerships to ensure our students are well-prepared for rewarding careers in these dynamic fields. At Bold Wings, we are shaping the future leaders of aviation, hospitality, and customer service.
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default About;