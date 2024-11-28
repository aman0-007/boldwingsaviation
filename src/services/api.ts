import axios from 'axios';

const API_BASE_URL = 'http://localhost:3000/api';

export const fetchGallery = async () => {
  const response = await axios.get(`${API_BASE_URL}/gallery`);
  return response.data;
};

export const fetchTestimonials = async () => {
  const response = await axios.get(`${API_BASE_URL}/testimonials`);
  return response.data;
};

export const fetchCourses = async () => {
  const response = await axios.get(`${API_BASE_URL}/courses`);
  return response.data;
};

export const fetchTeam = async () => {
  const response = await axios.get(`${API_BASE_URL}/team`);
  return response.data;
};