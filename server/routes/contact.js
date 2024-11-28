import express from 'express';
import { Contact } from '../models/Contact.js';

const router = express.Router();

// Create a new contact message
router.post('/contact', async (req, res) => {
  try {
    const contact = new Contact(req.body);
    await contact.save();
    res.status(201).json({ message: 'Message sent successfully!' });
  } catch (error) {
    res.status(400).json({ message: 'Failed to send message', error: error.message });
  }
});

// Get all contact messages (for admin panel)
router.get('/contact', async (req, res) => {
  try {
    const contacts = await Contact.find().sort({ createdAt: -1 });
    res.json(contacts);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch messages', error: error.message });
  }
});

// Delete a contact message (for admin panel)
router.delete('/contact/:id', async (req, res) => {
  try {
    await Contact.findByIdAndDelete(req.params.id);
    res.json({ message: 'Message deleted successfully!' });
  } catch (error) {
    res.status(500).json({ message: 'Failed to delete message', error: error.message });
  }
});

export const contactRouter = router;