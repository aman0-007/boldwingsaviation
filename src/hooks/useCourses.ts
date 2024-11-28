import { useState, useEffect } from 'react';
import { fetchCourses } from '../services/api';

interface Course {
  _id: string;
  title: string;
  subtitle: string;
  image: string;
  description: string;
  isLocal: boolean;
}

const useCourses = () => {
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
  }, []); // Only fetch once on mount

  return { courses, isLoading };
};

export default useCourses;