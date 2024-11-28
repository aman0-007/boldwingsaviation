import React from 'react';
import { motion } from 'framer-motion';
import ContactForm from '../components/contact/ContactForm';
import LocationCard from '../components/contact/LocationCard';
import ContactInfo from '../components/contact/ContactInfo';

const locations = [
  {
    name: 'Head Office (Vashi)',
    address: 'J-203, Tower 5, VRSCCL, Infotech International Park',
    phoneNumbers: ['+91 8655620541', '+91 8655620546'],
  },
  {
    name: 'Branch 1 (Vashi)',
    address: 'L-206, Tower 6, VRSCCL, Infotech International Park',
    phoneNumbers: ['9819549857'],
  },
  {
    name: 'Branch 2 (Panvel)',
    address: 'Shop 8-11, 1st Floor, Omkar Arcade',
    phoneNumbers: ['9819549857'],
  },
  {
    name: 'Branch 3 (Ayodhya)',
    address: '2nd floor Prakash Lawns, Rai Bareli Road, Near By-Pass Flyover, Ayodhya - 224001',
    phoneNumbers: ['9820696518'],
  },
];

const Contact = () => {
  return (
    <div className="min-h-screen bg-gray-50 pt-20">
      <div className="container mx-auto px-4 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl font-bold mb-4">Contact Us</h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Have questions? We'd love to hear from you. Send us a message and we'll respond as soon as possible.
          </p>
        </motion.div>

        <div className="mb-16">
          <h2 className="text-2xl font-bold mb-8 text-center">Our Locations</h2>
          <div className="grid md:grid-cols-2 gap-6">
            {locations.map((location, index) => (
              <LocationCard
                key={location.name}
                {...location}
                index={index}
              />
            ))}
          </div>
        </div>

        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-8 bg-white rounded-2xl shadow-lg p-8">
            <ContactForm />
            <ContactInfo />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;