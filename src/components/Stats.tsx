import React from 'react';
import CountUp from 'react-countup';
import { motion } from 'framer-motion';

const stats = [
  { title: 'Placement Assistance', value: 100 },
  { title: 'Knowledge Imparted', value: 100 },
  { title: 'Updated Skill Training', value: 100 },
];

const Stats = () => {
  return (
    <section className="py-20 bg-[#f9df54]/10">
      <div className="container mx-auto px-3">
        <div className="grid grid-cols-3 gap-8">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="text-center"
            >
              <div className="text-4xl md:text-5xl font-bold text-[#f9df54] mb-2">
                <CountUp end={stat.value} suffix="%" duration={2.5} />
              </div>
              <div className="text-gray-700">{stat.title}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Stats;