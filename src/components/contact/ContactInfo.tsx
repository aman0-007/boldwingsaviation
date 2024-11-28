import React from 'react';
import { Phone, Mail } from 'lucide-react';
import { motion } from 'framer-motion';

const ContactInfo = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3 }}
      className="bg-white p-8 rounded-2xl shadow-lg"
    >
      <h2 className="text-2xl font-semibold mb-6">Contact Details</h2>
      <div className="space-y-6">
        <div className="flex items-center space-x-4">
          <div className="bg-[#f9df54]/10 p-3 rounded-lg">
            <Phone className="w-6 h-6 text-[#f9df54]" />
          </div>
          <div>
            <p className="text-sm text-gray-500 mb-1">Call Us</p>
            <div className="space-y-1">
              <a href="tel:+918655620541" className="block text-gray-800 hover:text-[#f9df54] transition-colors">
                +91 8655620541
              </a>
              <a href="tel:+918655620546" className="block text-gray-800 hover:text-[#f9df54] transition-colors">
                +91 8655620546
              </a>
            </div>
          </div>
        </div>

        <div className="flex items-center space-x-4">
          <div className="bg-[#f9df54]/10 p-3 rounded-lg">
            <Mail className="w-6 h-6 text-[#f9df54]" />
          </div>
          <div>
            <p className="text-sm text-gray-500 mb-1">Email Us</p>
            <a
              href="mailto:info@boldwings.in"
              className="text-gray-800 hover:text-[#f9df54] transition-colors"
            >
              info@boldwings.in
            </a>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default ContactInfo;