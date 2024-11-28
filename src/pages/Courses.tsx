import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const courses = [
  {
    title: 'Aviation Management',
    subtitle: 'Comprehensive training in aviation operations',
    image: 'https://images.unsplash.com/photo-1436491865332-7a61a109cc05',
  },
  {
    title: 'Cabin Crew Training',
    subtitle: 'Professional flight attendant certification',
    image: 'https://images.unsplash.com/photo-1540962351504-03099e0a754b',
  },
  {
    title: 'Hospitality Management',
    subtitle: 'Expert training in hospitality services',
    image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945',
  },
  {
    title: 'Ground Staff Training',
    subtitle: 'Complete airport operations training',
    image: 'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957',
  },
];

const Courses = () => {
  return (
    <div className="pt-20">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="container mx-auto px-4 py-12"
      >
        <h1 className="text-4xl font-bold text-center mb-12">Our Courses</h1>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {courses.map((course, index) => (
            <motion.div
              key={course.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-all group"
            >
              <div className="relative overflow-hidden">
                <img
                  src={course.image}
                  alt={course.title}
                  className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-30 transition-opacity duration-300" />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-2">{course.title}</h3>
                <p className="text-gray-600 mb-4">{course.subtitle}</p>
                <Link
                  to="/contact"
                  className="inline-flex items-center text-[#f9df54] hover:text-[#f8f260] font-medium"
                >
                  Know More
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
};

export default Courses;