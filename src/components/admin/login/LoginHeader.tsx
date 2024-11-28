import React from 'react';
import { Plane } from 'lucide-react';
import { motion } from 'framer-motion';

const LoginHeader = () => {
  return (
    <div className="text-center mb-8">
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
        className="inline-block p-4 rounded-full bg-[#f9df54] mb-4"
      >
        <Plane className="h-8 w-8 text-gray-900" />
      </motion.div>
      <h2 className="text-3xl font-bold text-white mb-2">Welcome Back</h2>
      <p className="text-gray-300">Enter your credentials to access the dashboard</p>
    </div>
  );
};

export default LoginHeader;