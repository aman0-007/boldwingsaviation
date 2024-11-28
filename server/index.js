import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import { contactRouter } from './routes/contact.js';
import { galleryRouter } from './routes/gallery.js';
import { teamRouter } from './routes/team.js';
import { courseRouter } from './routes/course.js';
import { testimonialRouter } from './routes/testimonial.js';
import { queryRouter } from './routes/query.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static('public'));

// Database connection
mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('Connected to MongoDB'))
  .catch((err) => console.error('MongoDB connection error:', err));

// Routes
app.use('/api', contactRouter);
app.use('/api', galleryRouter);
app.use('/api', teamRouter);
app.use('/api', courseRouter);
app.use('/api', testimonialRouter);
app.use('/api', queryRouter);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Something went wrong!' });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});