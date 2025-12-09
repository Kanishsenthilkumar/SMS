const express = require('express');
const Student = require('../models/Student');

const router = express.Router();

// Public: list students for user portal search
router.get('/', async (_req, res) => {
  try {
    const students = await Student.find().sort({ createdAt: -1 });
    res.json(students);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;
