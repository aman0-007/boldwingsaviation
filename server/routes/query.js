import express from 'express';
import { Query } from '../models/Query.js';

const router = express.Router();

// Create a new query
router.post('/queries', async (req, res) => {
  try {
    const query = new Query(req.body);
    await query.save();
    res.status(201).json({ message: 'Query submitted successfully!' });
  } catch (error) {
    res.status(400).json({ message: 'Failed to submit query', error: error.message });
  }
});

// Get all queries with course details
router.get('/queries', async (req, res) => {
  try {
    const queries = await Query.find()
      .populate('courseId', 'title')
      .sort({ createdAt: -1 });
    res.json(queries);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch queries', error: error.message });
  }
});

// Update query status
router.patch('/queries/:id', async (req, res) => {
  try {
    const query = await Query.findByIdAndUpdate(
      req.params.id,
      { status: req.body.status },
      { new: true }
    );
    res.json(query);
  } catch (error) {
    res.status(400).json({ message: 'Failed to update query', error: error.message });
  }
});

// Delete query
router.delete('/queries/:id', async (req, res) => {
  try {
    await Query.findByIdAndDelete(req.params.id);
    res.json({ message: 'Query deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Failed to delete query', error: error.message });
  }
});

export const queryRouter = router;