const express = require('express');
const Student = require('../models/Student');

const router = express.Router();

// Create student (used by admin panel)
router.post('/', async (req, res) => {
  try {
    const data = req.body;

    // Basic required field check
    const requiredFields = [
      'studentId',
      'firstName',
      'lastName',
      'dob',
      'gender',
      'email',
      'phone',
      'guardianName',
      'emergencyContact',
      'grade',
      'address',
    ];

    for (const field of requiredFields) {
      if (!data[field]) {
        return res.status(400).json({ error: `${field} is required` });
      }
    }

    const student = await Student.create(data);
    res.status(201).json(student);
  } catch (err) {
    console.error(err);
    if (err.code === 11000) {
      return res.status(400).json({ error: 'Student ID must be unique' });
    }
    res.status(500).json({ error: 'Server error' });
  }
});

// List all students (admin view)
router.get('/', async (_req, res) => {
  try {
    const students = await Student.find().sort({ createdAt: -1 });
    res.json(students);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});

// Get single student by id
router.get('/:id', async (req, res) => {
  try {
    const student = await Student.findById(req.params.id);
    if (!student) return res.status(404).json({ error: 'Student not found' });
    res.json(student);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});

// Update student
router.put('/:id', async (req, res) => {
  try {
    const student = await Student.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!student) return res.status(404).json({ error: 'Student not found' });
    res.json(student);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});

// Delete student
router.delete('/:id', async (req, res) => {
  try {
    const student = await Student.findByIdAndDelete(req.params.id);
    if (!student) return res.status(404).json({ error: 'Student not found' });
    res.json({ message: 'Student deleted successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;
