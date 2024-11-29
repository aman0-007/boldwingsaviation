import React from 'react';
import { Facebook, Instagram, Linkedin, Mail, MapPin, Phone } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-12">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-3 gap-8">
          <div>
            <div className="flex items-center mb-6">
              <img src="/logo.png" alt="BoldWings Logo" className="h-12" />
              <span className="ml-2 text-2xl font-bold">
                <span style={{ color: '#FFD700' }}>Bold</span> 
                <span style={{ color: '#C0C0C0' }}> Wings</span>
              </span>
            </div>
            <p className="text-gray-400">
              Empowering dreams in aviation and hospitality education.
            </p>
          </div>
          
          <div>
            <h3 className="text-xl font-bold mb-4">Contact Us</h3>
            <div className="space-y-3">
              <div className="flex items-center">
                <Mail className="h-5 w-5 mr-2" />
                <a href="mailto:info@boldwings.com" className="text-gray-400 hover:text-[#f9df54]">
                  info@boldwings.com
                </a>
              </div>
              <div className="flex items-center">
                <Phone className="h-5 w-5 mr-2" />
                <a href="tel:+1234567890" className="text-gray-400 hover:text-[#f9df54]">
                +91 8655620541
                </a>
              </div>
              {/* <div className="flex items-center">
                <MapPin className="h-5 w-5 mr-2" />
                <span className="text-gray-400">
                  123 Aviation Street, City, Country
                </span>
              </div> */}
            </div>
          </div>
          
          <div>
            <h3 className="text-xl font-bold mb-4">Follow Us</h3>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-[#f9df54]">
                <Facebook className="h-6 w-6" />
              </a>
              <a href="https://www.instagram.com/boldwingsofficial" target='blank' className="text-gray-400 hover:text-[#f9df54]">
                <Instagram className="h-6 w-6" />
              </a>
              <a href="#" className="text-gray-400 hover:text-[#f9df54]">
                <Linkedin className="h-6 w-6" />
              </a>
            </div>
          </div>
        </div>
        
        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
          <p>&copy; {new Date().getFullYear()} BoldWings. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;