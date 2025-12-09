import { useState } from 'react';
import { Student } from '../types/student';
import { User, Printer, Share2 } from 'lucide-react';
import PersonalDetailsTab from './tabs/PersonalDetailsTab';
import AcademicRecordsTab from './tabs/AcademicRecordsTab';
import AttendanceTab from './tabs/AttendanceTab';
import FeeStatusTab from './tabs/FeeStatusTab';

interface StudentProfileProps {
  student: Student;
}

type TabType = 'personal' | 'academic' | 'attendance' | 'fees';

function StudentProfile({ student }: StudentProfileProps) {
  const [activeTab, setActiveTab] = useState<TabType>('personal');

  const handlePrint = () => {
    window.print();
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: `${student.name} - Student Profile`,
        text: `View student profile for ${student.name} (${student.id})`,
        url: window.location.href,
      });
    } else {
      alert('Share link: ' + window.location.href);
    }
  };

  const tabs = [
    { id: 'personal' as const, label: 'Personal Details' },
    { id: 'academic' as const, label: 'Academic Records' },
    { id: 'attendance' as const, label: 'Attendance Summary' },
    { id: 'fees' as const, label: 'Fee Status' },
  ];

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="bg-gradient-to-r from-[#3b82f6] to-[#2563eb] p-8">
          <div className="flex items-start justify-between">
            <div className="flex items-start space-x-6">
              <div className="w-24 h-24 bg-white rounded-full flex items-center justify-center shadow-lg">
                <User className="w-12 h-12 text-[#3b82f6]" />
              </div>
              <div className="text-white">
                <h2 className="text-3xl font-bold mb-2">{student.name}</h2>
                <p className="text-blue-100 text-lg mb-4">Student ID: {student.id}</p>
                <div className="flex flex-wrap gap-3">
                  <div className="bg-white/20 backdrop-blur-sm px-4 py-2 rounded-lg">
                    <p className="text-sm text-blue-100">Grade/Class</p>
                    <p className="font-semibold">{student.class}</p>
                  </div>
                  <div className="bg-white/20 backdrop-blur-sm px-4 py-2 rounded-lg">
                    <p className="text-sm text-blue-100">Roll Number</p>
                    <p className="font-semibold">{student.rollNumber}</p>
                  </div>
                  <div className="bg-white/20 backdrop-blur-sm px-4 py-2 rounded-lg">
                    <p className="text-sm text-blue-100">Status</p>
                    <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-semibold ${
                      student.status === 'Active'
                        ? 'bg-green-500 text-white'
                        : 'bg-gray-500 text-white'
                    }`}>
                      {student.status}
                    </span>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex space-x-3">
              <button
                onClick={handlePrint}
                className="bg-white text-[#3b82f6] px-4 py-2 rounded-lg font-medium hover:bg-blue-50 transition-colors flex items-center space-x-2 shadow-md"
              >
                <Printer className="w-5 h-5" />
                <span>Print Profile</span>
              </button>
              <button
                onClick={handleShare}
                className="bg-white text-[#3b82f6] px-4 py-2 rounded-lg font-medium hover:bg-blue-50 transition-colors flex items-center space-x-2 shadow-md"
              >
                <Share2 className="w-5 h-5" />
                <span>Share</span>
              </button>
            </div>
          </div>
        </div>

        <div className="border-b border-gray-200 bg-gray-50">
          <div className="flex space-x-1 p-4">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-6 py-3 rounded-lg font-medium transition-all duration-200 ${
                  activeTab === tab.id
                    ? 'bg-[#3b82f6] text-white shadow-md'
                    : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        <div className="p-8">
          {activeTab === 'personal' && <PersonalDetailsTab details={student.personalDetails} />}
          {activeTab === 'academic' && <AcademicRecordsTab records={student.academicRecords} />}
          {activeTab === 'attendance' && <AttendanceTab attendance={student.attendance} />}
          {activeTab === 'fees' && <FeeStatusTab feeStatus={student.feeStatus} />}
        </div>
      </div>
    </div>
  );
}

export default StudentProfile;
