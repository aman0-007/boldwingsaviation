import express from 'express';
import multer from 'multer';
import path from 'path';
import { Testimonial } from '../models/Testimonial.js';

const router = express.Router();

// Configure multer for image upload
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'public/testimonials')
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

// Get all testimonials
router.get('/testimonials', async (req, res) => {
  try {
    const testimonials = await Testimonial.find().sort({ createdAt: -1 });
    res.json(testimonials);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching testimonials', error: error.message });
  }
});

// Add new testimonial (URL)
router.post('/testimonials/url', async (req, res) => {
  try {
    const testimonial = new Testimonial({
      name: req.body.name,
      role: req.body.role,
      image: req.body.image,
      description: req.body.description,
      isLocal: false
    });
    await testimonial.save();
    res.status(201).json(testimonial);
  } catch (error) {
    res.status(400).json({ message: 'Error adding testimonial', error: error.message });
  }
});

// Add new testimonial (File upload)
router.post('/testimonials/upload', upload.single('image'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: 'No image file provided' });
    }

    const testimonial = new Testimonial({
      name: req.body.name,
      role: req.body.role,
      image: `/testimonials/${req.file.filename}`,
      description: req.body.description,
      isLocal: true
    });
    await testimonial.save();
    res.status(201).json(testimonial);
  } catch (error) {
    res.status(400).json({ message: 'Error uploading testimonial', error: error.message });
  }
});

// Update testimonial
router.put('/testimonials/:id', upload.single('image'), async (req, res) => {
  try {
    const updateData = {
      name: req.body.name,
      role: req.body.role,
      description: req.body.description
    };

    if (req.file) {
      updateData.image = `/testimonials/${req.file.filename}`;
      updateData.isLocal = true;
    } else if (req.body.image) {
      updateData.image = req.body.image;
      updateData.isLocal = false;
    }

    const testimonial = await Testimonial.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true }
    );
    res.json(testimonial);
  } catch (error) {
    res.status(400).json({ message: 'Error updating testimonial', error: error.message });
  }
});

// Delete testimonial
router.delete('/testimonials/:id', async (req, res) => {
  try {
    await Testimonial.findByIdAndDelete(req.params.id);
    res.json({ message: 'Testimonial deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting testimonial', error: error.message });
  }
});

export const testimonialRouter = router;