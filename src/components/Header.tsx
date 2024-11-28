import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();
  const isHomePage = location.pathname === '/';

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
      className={`fixed w-full z-50 transition-all duration-300 ${
        isScrolled || !isHomePage
          ? 'bg-white/95 backdrop-blur-sm shadow-lg'
          : 'bg-transparent'
      }`}
    >
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center space-x-3">
            <img src="/logo.png" alt="BoldWings Logo" className="h-12 w-auto" />
            <span
              className={`text-2xl font-bold ${
                isScrolled || !isHomePage ? 'text-gray-800' : 'text-white'
              } transition-colors duration-300`}
            >
              <span style={{ color: '#FFD700' }}>Bold</span> 
              <span style={{ color: '#C0C0C0' }}> Wings</span>
            </span>
          </Link>

          <nav className="hidden md:flex items-center space-x-8">
            {[
              { name: 'Home', path: '/' },
              { name: 'Team', path: '/team' },
              { name: 'Courses', path: '/courses' },
              { name: 'Life at Bold Wings', path: '/life' },
              { name: 'Gallery', path: '/gallery' },
              { name: 'Contact', path: '/contact' },
            ].map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`relative font-medium text-sm uppercase tracking-wider ${
                  isScrolled || !isHomePage
                    ? 'text-gray-700 hover:text-[#f9df54]'
                    : 'text-white hover:text-[#f9df54]'
                } transition-colors duration-300 ${
                  location.pathname === item.path
                    ? 'after:content-[""] after:absolute after:-bottom-2 after:left-0 after:w-full after:h-0.5 after:bg-[#f9df54]'
                    : ''
                }`}
              >
                {item.name}
              </Link>
            ))}
          </nav>

          <button
            className="md:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? (
              <X
                className={`h-6 w-6 ${
                  isScrolled || !isHomePage ? 'text-gray-800' : 'text-white'
                }`}
              />
            ) : (
              <Menu
                className={`h-6 w-6 ${
                  isScrolled || !isHomePage ? 'text-gray-800' : 'text-white'
                }`}
              />
            )}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-white/95 backdrop-blur-sm border-t"
          >
            <div className="container mx-auto px-4 py-4">
              {[
                { name: 'Home', path: '/' },
                { name: 'Team', path: '/team' },
                { name: 'Courses', path: '/courses' },
                { name: 'Life at Bold Wings', path: '/life' },
                { name: 'Gallery', path: '/gallery' },
                { name: 'Contact', path: '/contact' },
              ].map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`block py-3 text-gray-700 hover:text-[#f9df54] transition-colors duration-300 ${
                    location.pathname === item.path ? 'text-[#f9df54]' : ''
                  }`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.name}
                </Link>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Header;
