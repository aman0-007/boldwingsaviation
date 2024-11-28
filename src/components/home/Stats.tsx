import React from 'react';
import { motion } from 'framer-motion';
import useCountUp from '../hooks/useCountUp';

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
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              className="text-center"
            >
              <div className="text-4xl md:text-5xl font-bold text-[#f9df54] mb-2">
                <CountUpValue value={stat.value} />
              </div>
              <div className="text-gray-700">{stat.title}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const CountUpValue = ({ value }: { value: number }) => {
  const count = useCountUp(value);
  return <span>{count}%</span>;
};

export default Stats;