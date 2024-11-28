import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { fetchCourses } from '../services/api';

interface Course {
  _id: string;
  title: string;
  subtitle: string;
  image: string;
  description: string;
  isLocal: boolean;
}

const Courses = () => {
  const [courses, setCourses] = useState<Course[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadCourses = async () => {
      try {
        const data = await fetchCourses();
        setCourses(data);
      } catch (error) {
        console.error('Failed to fetch courses:', error);
      } finally {
        setIsLoading(false);
      }
    };

    loadCourses();
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
        <h1 className="text-4xl font-bold text-center mb-12">Our Courses</h1>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {courses.map((course, index) => (
            <motion.div
              key={course._id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-all group"
            >
              <div className="relative overflow-hidden">
                <img
                  src={course.isLocal ? `http://localhost:3000${course.image}` : course.image}
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