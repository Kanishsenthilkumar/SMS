import { BookOpen, Award, MessageSquare } from 'lucide-react';
import { Student } from '../../types/student';

interface AcademicRecordsTabProps {
  records: Student['academicRecords'];
}

function AcademicRecordsTab({ records }: AcademicRecordsTabProps) {
  return (
    <div className="space-y-6">
      <div className="bg-gray-50 rounded-lg p-6 border border-gray-200">
        <div className="flex items-center space-x-3 mb-4">
          <div className="bg-[#3b82f6] p-2 rounded-lg">
            <BookOpen className="w-5 h-5 text-white" />
          </div>
          <h3 className="text-xl font-semibold text-gray-900">Current Subjects</h3>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
          {records.currentSubjects.map((subject, index) => (
            <div
              key={index}
              className="bg-white px-4 py-3 rounded-lg border border-gray-200 text-gray-700 font-medium"
            >
              {subject}
            </div>
          ))}
        </div>
      </div>

      <div className="bg-gray-50 rounded-lg p-6 border border-gray-200">
        <div className="flex items-center space-x-3 mb-4">
          <div className="bg-[#3b82f6] p-2 rounded-lg">
            <Award className="w-5 h-5 text-white" />
          </div>
          <h3 className="text-xl font-semibold text-gray-900">Previous Grades</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-300">
                <th className="text-left py-3 px-4 text-gray-700 font-semibold">Subject</th>
                <th className="text-left py-3 px-4 text-gray-700 font-semibold">Grade</th>
                <th className="text-left py-3 px-4 text-gray-700 font-semibold">Term</th>
              </tr>
            </thead>
            <tbody>
              {records.previousGrades.map((grade, index) => (
                <tr key={index} className="border-b border-gray-200 hover:bg-white transition-colors">
                  <td className="py-3 px-4 text-gray-900">{grade.subject}</td>
                  <td className="py-3 px-4">
                    <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-semibold bg-[#3b82f6] text-white">
                      {grade.grade}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-gray-600">{grade.term}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="bg-gray-50 rounded-lg p-6 border border-gray-200">
        <div className="flex items-center space-x-3 mb-4">
          <div className="bg-[#3b82f6] p-2 rounded-lg">
            <MessageSquare className="w-5 h-5 text-white" />
          </div>
          <h3 className="text-xl font-semibold text-gray-900">Teacher Remarks</h3>
        </div>
        <p className="text-gray-700 leading-relaxed bg-white p-4 rounded-lg border border-gray-200">
          {records.teacherRemarks}
        </p>
      </div>
    </div>
  );
}

export default AcademicRecordsTab;
