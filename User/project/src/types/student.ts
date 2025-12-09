export interface Student {
  id: string;
  name: string;
  class: string;
  rollNumber: string;
  status: 'Active' | 'Inactive';
  avatar?: string;
  personalDetails: {
    dateOfBirth: string;
    gender: string;
    email: string;
    phone: string;
    parentName: string;
    address: string;
  };
  academicRecords: {
    currentSubjects: string[];
    previousGrades: {
      subject: string;
      grade: string;
      term: string;
    }[];
    teacherRemarks: string;
  };
  attendance: {
    percentage: number;
    daysPresent: number;
    daysAbsent: number;
    totalDays: number;
  };
  feeStatus: {
    status: 'Paid' | 'Pending';
    dueAmount: number;
    paymentHistory: {
      date: string;
      amount: number;
      type: string;
    }[];
  };
}
