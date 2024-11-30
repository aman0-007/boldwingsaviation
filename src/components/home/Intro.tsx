import React from 'react';
import { motion } from 'framer-motion';

const Intro = () => {
  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center gap-12">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="md:w-1/2"
          >
            <h2 className="text-4xl font-bold mb-6 text-gray-800">
              Bold Wings - <br/>
              <span className="text-3xl md:text-xl font-medium">Institute of Aviation and Hospitality</span>

            </h2>
            <p className="text-gray-600 mb-6 text-lg leading-relaxed">
              Welcome to Bold Wings Institute, where we transform aspirations into achievements. As a premier institution specializing in aviation and hospitality education, we provide comprehensive training programs designed to launch successful careers in these dynamic industries.
            </p>
            <p className="text-gray-600 text-lg leading-relaxed">
              Our state-of-the-art facilities, experienced faculty, and industry partnerships create an environment where students not only learn but thrive. At Bold Wings, we believe in nurturing talent, fostering innovation, and building the leaders of tomorrow.
            </p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="md:w-1/2"
          >
            <img
              src="\welcomeimage.png"
              alt="Bold Wings Institute"
              className="rounded-lg shadow-xl w-full h-[400px] object-cover"
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Intro;