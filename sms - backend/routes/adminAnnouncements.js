const express = require('express');
const Announcement = require('../models/Announcement');

const router = express.Router();

// Create announcement
router.post('/', async (req, res) => {
  try {
    const { title, message } = req.body;
    const announcement = await Announcement.create({ title, message });
    res.status(201).json(announcement);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});

// List all announcements (admin view)
router.get('/', async (req, res) => {
  try {
    const announcements = await Announcement.find().sort({ createdAt: -1 });
    res.json(announcements);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});

// Update announcement
router.put('/:id', async (req, res) => {
  try {
    const { title, message } = req.body;
    const announcement = await Announcement.findByIdAndUpdate(
      req.params.id,
      { title, message },
      { new: true }
    );
    if (!announcement) return res.status(404).json({ error: 'Not found' });
    res.json(announcement);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});

// Delete announcement
router.delete('/:id', async (req, res) => {
  try {
    const announcement = await Announcement.findByIdAndDelete(req.params.id);
    if (!announcement) return res.status(404).json({ error: 'Not found' });
    res.json({ message: 'Deleted' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;
