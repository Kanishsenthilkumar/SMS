const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema(
  {
    studentId: { type: String, required: true, unique: true },
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    dob: { type: String, required: true },
    gender: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String, required: true },
    guardianName: { type: String, required: true },
    emergencyContact: { type: String, required: true },
    grade: { type: String, required: true },
    subjects: { type: [String], default: [] },
    address: { type: String, required: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Student', studentSchema);
