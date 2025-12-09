import { Student } from '../types/student';

export const studentDatabase: Student[] = [
  {
    id: 'STU001',
    name: 'Emma Johnson',
    class: 'Grade 10 - Section A',
    rollNumber: 'RN-045',
    status: 'Active',
    personalDetails: {
      dateOfBirth: '2008-05-15',
      gender: 'Female',
      email: 'emma.johnson@studentportal.edu',
      phone: '+1 (555) 123-4567',
      parentName: 'Michael Johnson',
      address: '123 Maple Street, Springfield, IL 62701',
    },
    academicRecords: {
      currentSubjects: ['Mathematics', 'English Literature', 'Physics', 'Chemistry', 'History', 'Physical Education'],
      previousGrades: [
        { subject: 'Mathematics', grade: 'A', term: 'Term 1' },
        { subject: 'English Literature', grade: 'A-', term: 'Term 1' },
        { subject: 'Physics', grade: 'B+', term: 'Term 1' },
        { subject: 'Chemistry', grade: 'A', term: 'Term 1' },
        { subject: 'History', grade: 'B', term: 'Term 1' },
      ],
      teacherRemarks: 'Excellent student with strong analytical skills. Shows great enthusiasm in science subjects.',
    },
    attendance: {
      percentage: 95,
      daysPresent: 171,
      daysAbsent: 9,
      totalDays: 180,
    },
    feeStatus: {
      status: 'Paid',
      dueAmount: 0,
      paymentHistory: [
        { date: '2024-09-01', amount: 1200, type: 'Tuition Fee - Semester 1' },
        { date: '2024-08-15', amount: 300, type: 'Laboratory Fee' },
        { date: '2024-07-01', amount: 150, type: 'Library Fee' },
      ],
    },
  },
  {
    id: 'STU002',
    name: 'Liam Chen',
    class: 'Grade 11 - Section B',
    rollNumber: 'RN-078',
    status: 'Active',
    personalDetails: {
      dateOfBirth: '2007-09-22',
      gender: 'Male',
      email: 'liam.chen@studentportal.edu',
      phone: '+1 (555) 234-5678',
      parentName: 'Wei Chen',
      address: '456 Oak Avenue, Springfield, IL 62702',
    },
    academicRecords: {
      currentSubjects: ['Advanced Mathematics', 'Computer Science', 'Physics', 'Chemistry', 'English', 'Economics'],
      previousGrades: [
        { subject: 'Mathematics', grade: 'A+', term: 'Term 1' },
        { subject: 'Computer Science', grade: 'A+', term: 'Term 1' },
        { subject: 'Physics', grade: 'A', term: 'Term 1' },
        { subject: 'Chemistry', grade: 'A-', term: 'Term 1' },
        { subject: 'English', grade: 'B+', term: 'Term 1' },
      ],
      teacherRemarks: 'Outstanding performance in STEM subjects. Natural problem-solver with excellent coding skills.',
    },
    attendance: {
      percentage: 98,
      daysPresent: 176,
      daysAbsent: 4,
      totalDays: 180,
    },
    feeStatus: {
      status: 'Paid',
      dueAmount: 0,
      paymentHistory: [
        { date: '2024-09-01', amount: 1400, type: 'Tuition Fee - Semester 1' },
        { date: '2024-08-20', amount: 400, type: 'Computer Lab Fee' },
      ],
    },
  },
  {
    id: 'STU003',
    name: 'Sophia Martinez',
    class: 'Grade 9 - Section A',
    rollNumber: 'RN-023',
    status: 'Active',
    personalDetails: {
      dateOfBirth: '2009-03-10',
      gender: 'Female',
      email: 'sophia.martinez@studentportal.edu',
      phone: '+1 (555) 345-6789',
      parentName: 'Carlos Martinez',
      address: '789 Pine Road, Springfield, IL 62703',
    },
    academicRecords: {
      currentSubjects: ['Mathematics', 'English', 'Biology', 'Geography', 'Art', 'Music'],
      previousGrades: [
        { subject: 'Mathematics', grade: 'B+', term: 'Term 1' },
        { subject: 'English', grade: 'A', term: 'Term 1' },
        { subject: 'Biology', grade: 'A-', term: 'Term 1' },
        { subject: 'Geography', grade: 'B', term: 'Term 1' },
        { subject: 'Art', grade: 'A+', term: 'Term 1' },
      ],
      teacherRemarks: 'Creative and expressive student. Excels in arts and shows strong communication skills.',
    },
    attendance: {
      percentage: 92,
      daysPresent: 165,
      daysAbsent: 15,
      totalDays: 180,
    },
    feeStatus: {
      status: 'Pending',
      dueAmount: 500,
      paymentHistory: [
        { date: '2024-08-01', amount: 1000, type: 'Tuition Fee - Partial Payment' },
        { date: '2024-07-15', amount: 200, type: 'Art Supplies Fee' },
      ],
    },
  },
];
