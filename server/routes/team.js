import express from 'express';
import multer from 'multer';
import path from 'path';
import { Team } from '../models/Team.js';

const router = express.Router();

// Configure multer for image upload
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'public/teams')
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

// Get all team members
router.get('/team', async (req, res) => {
  try {
    const members = await Team.find().sort({ createdAt: -1 });
    res.json(members);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching team members', error: error.message });
  }
});

// Add new team member (URL)
router.post('/team/url', async (req, res) => {
  try {
    const member = new Team({
      name: req.body.name,
      designation: req.body.designation,
      image: req.body.image,
      intro: req.body.intro,
      isLocal: false
    });
    await member.save();
    res.status(201).json(member);
  } catch (error) {
    res.status(400).json({ message: 'Error adding team member', error: error.message });
  }
});

// Add new team member (File upload)
router.post('/team/upload', upload.single('image'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: 'No image file provided' });
    }

    const member = new Team({
      name: req.body.name,
      designation: req.body.designation,
      image: `/teams/${req.file.filename}`,
      intro: req.body.intro,
      isLocal: true
    });
    await member.save();
    res.status(201).json(member);
  } catch (error) {
    res.status(400).json({ message: 'Error uploading team member', error: error.message });
  }
});

// Update team member
router.put('/team/:id', upload.single('image'), async (req, res) => {
  try {
    const updateData = {
      name: req.body.name,
      designation: req.body.designation,
      intro: req.body.intro
    };

    if (req.file) {
      updateData.image = `/teams/${req.file.filename}`;
      updateData.isLocal = true;
    } else if (req.body.image) {
      updateData.image = req.body.image;
      updateData.isLocal = false;
    }

    const member = await Team.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true }
    );
    res.json(member);
  } catch (error) {
    res.status(400).json({ message: 'Error updating team member', error: error.message });
  }
});

// Delete team member
router.delete('/team/:id', async (req, res) => {
  try {
    await Team.findByIdAndDelete(req.params.id);
    res.json({ message: 'Team member deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting team member', error: error.message });
  }
});

export const teamRouter = router;