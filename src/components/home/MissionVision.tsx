import React from 'react';
import { motion } from 'framer-motion';

const MissionVision = () => {
  return (
    <section className="py-20">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-2 gap-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="bg-white rounded-lg shadow-lg overflow-hidden"
          >
            <img
              src="https://images.unsplash.com/photo-1517245386807-bb43f82c33c4"
              alt="Our Mission"
              className="w-full h-64 object-cover"
            />
            <div className="p-6">
              <h3 className="text-2xl font-bold mb-4 text-gray-800">Our Mission</h3>
              <p className="text-gray-600">
                To provide industry-relevant training in aviation, hospitality, and customer service, fostering growth, creativity, and hands-on experience, while empowering students with the skills and values for lifelong success and building strong industry partnerships to enhance career opportunities.</p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.2 }}
            className="bg-white rounded-lg shadow-lg overflow-hidden"
          >
            <img
              src="https://images.unsplash.com/photo-1517960413843-0aee8e2b3285"
              alt="Our Vision"
              className="w-full h-64 object-cover"
            />
            <div className="p-6">
              <h3 className="text-2xl font-bold mb-4 text-gray-800">Our Vision</h3>
              <p className="text-gray-600">
                To be a leading institute in aviation and hospitality education, empowering individuals with the skills, confidence, and professionalism to excel globally in the dynamic fields of aviation, hospitality and Customer service.
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default MissionVision;