import React from 'react';
import { MapPin } from 'lucide-react';
import { motion } from 'framer-motion';

interface LocationCardProps {
  name: string;
  address: string;
  phoneNumbers: string[];
  index: number;
}

const LocationCard: React.FC<LocationCardProps> = ({ name, address, phoneNumbers, index }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow"
    >
      <div className="flex items-start space-x-4">
        <div className="bg-[#f9df54]/10 p-3 rounded-lg">
          <MapPin className="w-6 h-6 text-[#f9df54]" />
        </div>
        <div>
          <h3 className="font-semibold text-lg mb-2">{name}</h3>
          <p className="text-gray-600 mb-3">{address}</p>
          <div className="space-y-1">
            {phoneNumbers.map((phone, idx) => (
              <a
                key={idx}
                href={`tel:${phone}`}
                className="block text-[#f9df54] hover:text-[#f8f260] transition-colors"
              >
                {phone}
              </a>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default LocationCard;