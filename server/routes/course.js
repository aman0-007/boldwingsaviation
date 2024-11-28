import express from 'express';
import multer from 'multer';
import path from 'path';
import { Course } from '../models/Course.js';

const router = express.Router();

// Configure multer for image upload
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'public/courses')
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname))
  }
});

const upload = multer({ 
  storage: storage,
  fileFilter: (req, file, cb) => {
    const allowedTypes = /jpeg|jpg|png|gif/;
    const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = allowedTypes.test(file.mimetype);
    if (extname && mimetype) {
      return cb(null, true);
    }
    cb(new Error('Only image files are allowed!'));
  }
});

// Get all courses
router.get('/courses', async (req, res) => {
  try {
    const courses = await Course.find().sort({ createdAt: -1 });
    res.json(courses);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching courses', error: error.message });
  }
});

// Add new course (URL)
router.post('/courses/url', async (req, res) => {
  try {
    const course = new Course({
      title: req.body.title,
      subtitle: req.body.subtitle,
      description: req.body.description,
      image: req.body.image,
      isLocal: false
    });
    await course.save();
    res.status(201).json(course);
  } catch (error) {
    res.status(400).json({ message: 'Error adding course', error: error.message });
  }
});

// Add new course (File upload)
router.post('/courses/upload', upload.single('image'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: 'No image file provided' });
    }

    const course = new Course({
      title: req.body.title,
      subtitle: req.body.subtitle,
      description: req.body.description,
      image: `/courses/${req.file.filename}`,
      isLocal: true
    });
    await course.save();
    res.status(201).json(course);
  } catch (error) {
    res.status(400).json({ message: 'Error uploading course', error: error.message });
  }
});

// Update course
router.put('/courses/:id', upload.single('image'), async (req, res) => {
  try {
    const updateData = {
      title: req.body.title,
      subtitle: req.body.subtitle,
      description: req.body.description
    };

    if (req.file) {
      updateData.image = `/courses/${req.file.filename}`;
      updateData.isLocal = true;
    } else if (req.body.image) {
      updateData.image = req.body.image;
      updateData.isLocal = false;
    }

    const course = await Course.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true }
    );
    res.json(course);
  } catch (error) {
    res.status(400).json({ message: 'Error updating course', error: error.message });
  }
});

// Delete course
router.delete('/courses/:id', async (req, res) => {
  try {
    await Course.findByIdAndDelete(req.params.id);
    res.json({ message: 'Course deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting course', error: error.message });
  }
});

export const courseRouter = router;