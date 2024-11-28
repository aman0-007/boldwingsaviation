import express from 'express';
import multer from 'multer';
import path from 'path';
import { Gallery } from '../models/Gallery.js';

const router = express.Router();

// Configure multer for image upload
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'public/gallery')
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

// Get all gallery images
router.get('/gallery', async (req, res) => {
  try {
    const images = await Gallery.find().sort({ createdAt: -1 });
    res.json(images);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching gallery images', error: error.message });
  }
});

// Add new gallery image (URL)
router.post('/gallery/url', async (req, res) => {
  try {
    const gallery = new Gallery({
      title: req.body.title,
      image_url: req.body.image_url,
      isLocal: false
    });
    await gallery.save();
    res.status(201).json(gallery);
  } catch (error) {
    res.status(400).json({ message: 'Error adding gallery image', error: error.message });
  }
});

// Add new gallery image (File upload)
router.post('/gallery/upload', upload.single('image'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: 'No image file provided' });
    }

    const gallery = new Gallery({
      title: req.body.title,
      image_url: `/gallery/${req.file.filename}`,
      isLocal: true
    });
    await gallery.save();
    res.status(201).json(gallery);
  } catch (error) {
    res.status(400).json({ message: 'Error uploading image', error: error.message });
  }
});

// Delete gallery image
router.delete('/gallery/:id', async (req, res) => {
  try {
    await Gallery.findByIdAndDelete(req.params.id);
    res.json({ message: 'Gallery image deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting gallery image', error: error.message });
  }
});

export const galleryRouter = router;