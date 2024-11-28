import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { fetchTeam } from '../services/api';

interface TeamMember {
  _id: string;
  name: string;
  designation: string;
  image: string;
  intro: string;
  isLocal: boolean;
}

const Team = () => {
  const [teamMembers, setTeamMembers] = useState<TeamMember[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadTeam = async () => {
      try {
        const data = await fetchTeam();
        setTeamMembers(data);
      } catch (error) {
        console.error('Failed to fetch team:', error);
      } finally {
        setIsLoading(false);
      }
    };

    loadTeam();
  }, []);

  if (isLoading) {
    return (
      <div className="pt-20 min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#f9df54]"></div>
      </div>
    );
  }

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
              key={member._id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow"
            >
              <div className="aspect-w-1 aspect-h-1 relative overflow-hidden">
                <img
                  src={member.isLocal ? `http://localhost:3000${member.image}` : member.image}
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