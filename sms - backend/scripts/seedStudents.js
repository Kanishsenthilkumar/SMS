require('dotenv').config();
const mongoose = require('mongoose');
const Student = require('../models/Student');

async function main() {
  try {
    const uri = process.env.MONGODB_URI || process.env.MONGO_URI;
    if (!uri) {
      console.error('No MONGODB_URI or MONGO_URI in .env');
      process.exit(1);
    }

    await mongoose.connect(uri);
    console.log('Connected to MongoDB');

    const dummyStudents = [
      {
        studentId: 'SMS2024-001',
        firstName: 'Emma',
        lastName: 'Johnson',
        dob: '2008-05-15',
        gender: 'Female',
        email: 'emma.j@email.com',
        phone: '+1-234-567-8901',
        guardianName: 'Robert Johnson',
        emergencyContact: '+1-234-567-8901',
        grade: '10',
        subjects: ['Mathematics', 'English', 'Science'],
        address: '123 Main Street',
      },
      {
        studentId: 'SMS2024-002',
        firstName: 'Michael',
        lastName: 'Chen',
        dob: '2007-09-22',
        gender: 'Male',
        email: 'michael.c@email.com',
        phone: '+1-234-567-8902',
        guardianName: 'Linda Chen',
        emergencyContact: '+1-234-567-8902',
        grade: '11',
        subjects: ['Advanced Mathematics', 'Computer Science'],
        address: '456 Oak Avenue',
      },
      {
        studentId: 'SMS2024-003',
        firstName: 'Sarah',
        lastName: 'Williams',
        dob: '2009-03-10',
        gender: 'Female',
        email: 'sarah.w@email.com',
        phone: '+1-234-567-8903',
        guardianName: 'David Williams',
        emergencyContact: '+1-234-567-8903',
        grade: '9',
        subjects: ['Mathematics', 'English', 'Biology'],
        address: '789 Pine Road',
      },
      {
        studentId: 'SMS2024-004',
        firstName: 'James',
        lastName: 'Brown',
        dob: '2006-11-30',
        gender: 'Male',
        email: 'james.b@email.com',
        phone: '+1-234-567-8904',
        guardianName: 'Patricia Brown',
        emergencyContact: '+1-234-567-8904',
        grade: '12',
        subjects: ['Physics', 'Chemistry'],
        address: '321 Oak Lane',
      },
      {
        studentId: 'SMS2024-005',
        firstName: 'Olivia',
        lastName: 'Martinez',
        dob: '2008-01-18',
        gender: 'Female',
        email: 'olivia.m@email.com',
        phone: '+1-234-567-8905',
        guardianName: 'Carlos Martinez',
        emergencyContact: '+1-234-567-8905',
        grade: '10',
        subjects: ['Art', 'History'],
        address: '654 Pine Street',
      },
      {
        studentId: 'SMS2024-006',
        firstName: 'William',
        lastName: 'Davis',
        dob: '2010-04-25',
        gender: 'Male',
        email: 'william.d@email.com',
        phone: '+1-234-567-8906',
        guardianName: 'Jennifer Davis',
        emergencyContact: '+1-234-567-8906',
        grade: '8',
        subjects: ['Mathematics', 'Science'],
        address: '987 Cedar Road',
      },
      {
        studentId: 'SMS2024-007',
        firstName: 'Sophia',
        lastName: 'Garcia',
        dob: '2007-07-12',
        gender: 'Female',
        email: 'sophia.g@email.com',
        phone: '+1-234-567-8907',
        guardianName: 'Miguel Garcia',
        emergencyContact: '+1-234-567-8907',
        grade: '11',
        subjects: ['English', 'Economics'],
        address: '111 Birch Lane',
      },
      {
        studentId: 'SMS2024-008',
        firstName: 'Benjamin',
        lastName: 'Lee',
        dob: '2009-09-05',
        gender: 'Male',
        email: 'benjamin.l@email.com',
        phone: '+1-234-567-8908',
        guardianName: 'Susan Lee',
        emergencyContact: '+1-234-567-8908',
        grade: '9',
        subjects: ['Mathematics', 'Geography'],
        address: '222 Maple Avenue',
      },
    ];

    // Upsert by studentId so we don't create duplicates if run multiple times
    for (const s of dummyStudents) {
      await Student.updateOne({ studentId: s.studentId }, { $set: s }, { upsert: true });
      console.log('Upserted', s.studentId);
    }

    console.log('Seeding complete');
    await mongoose.disconnect();
    process.exit(0);
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
}

main();
