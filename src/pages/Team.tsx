import React from 'react';
import { motion } from 'framer-motion';

const teamMembers = [
  {
    name: 'Meenakshi Ramteke',
    designation: 'CEO of Bold Wings',
    image: 'public\\teams\\meenakshiramakate.jpg',
    intro: 'With 25 years of experience in the education sector, she drives the growth and success of Bold Wings, leading with a vision for excellence and positive impact.',
  },
  {
    name: 'Anju Gupta',
    designation: 'Founder and CMD of Bold Wings',
    image: 'public\\teams\\anjugupta.jpg',
    intro: 'With 11 years of diverse experience in media and construction, she founded Bold Wings in 2023 to contribute to skill-based education and drive its growth with creative vision and entrepreneurial expertise.',
  },
  {
    name: 'Priyanka Hotkar',
    designation: 'HOD Of Training and Placement',
    image: 'public\\teams\\priyankahotkar.jpg',
    intro: 'With 11 years of experience in aviation and hospitality, she brings expertise from top organizations like Shangri-La, Marriott, and Qatar Airways, focusing on empowering youth through skill development for successful careers in these industries.',
  },
];

const Team = () => {
  return (
    <div className="pt-20">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="container mx-auto px-4 py-12"
      >
        <h1 className="text-4xl font-bold text-center mb-12">Our Team</h1>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-14">
          {teamMembers.map((member, index) => (
            <motion.div
              key={member.name}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow"
            >
              <div className="aspect-w-1 aspect-h-1 relative overflow-hidden">
                <img
                  src={member.image}
                  alt={member.name}
                  className="w-full h-64 object-cover object-center"
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-2">{member.name}</h3>
                <p className="text-[#f9df54] font-medium mb-3">{member.designation}</p>
                <p className="text-gray-600">{member.intro}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
};

export default Team;