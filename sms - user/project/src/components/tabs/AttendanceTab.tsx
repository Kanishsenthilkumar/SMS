import { Calendar, CheckCircle, XCircle, PieChart } from 'lucide-react';
import { Student } from '../../types/student';

interface AttendanceTabProps {
  attendance: Student['attendance'];
}

function AttendanceTab({ attendance }: AttendanceTabProps) {
  const getStatusColor = (percentage: number) => {
    if (percentage >= 90) return 'text-green-600';
    if (percentage >= 75) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getStatusBg = (percentage: number) => {
    if (percentage >= 90) return 'bg-green-50 border-green-200';
    if (percentage >= 75) return 'bg-yellow-50 border-yellow-200';
    return 'bg-red-50 border-red-200';
  };

  return (
    <div className="space-y-6">
      <div className={`rounded-lg p-8 border-2 ${getStatusBg(attendance.percentage)}`}>
        <div className="flex items-center justify-center mb-4">
          <div className="relative">
            <PieChart className={`w-20 h-20 ${getStatusColor(attendance.percentage)}`} />
            <div className="absolute inset-0 flex items-center justify-center">
              <span className={`text-2xl font-bold ${getStatusColor(attendance.percentage)}`}>
                {attendance.percentage}%
              </span>
            </div>
          </div>
        </div>
        <p className="text-center text-xl font-semibold text-gray-900">
          Overall Attendance
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-blue-50 rounded-lg p-6 border border-blue-200">
          <div className="flex items-start space-x-3">
            <div className="bg-[#3b82f6] p-2 rounded-lg">
              <Calendar className="w-6 h-6 text-white" />
            </div>
            <div className="flex-1">
              <p className="text-sm text-blue-600 mb-1">Total Days</p>
              <p className="text-3xl text-gray-900 font-bold">{attendance.totalDays}</p>
            </div>
          </div>
        </div>

        <div className="bg-green-50 rounded-lg p-6 border border-green-200">
          <div className="flex items-start space-x-3">
            <div className="bg-green-600 p-2 rounded-lg">
              <CheckCircle className="w-6 h-6 text-white" />
            </div>
            <div className="flex-1">
              <p className="text-sm text-green-600 mb-1">Days Present</p>
              <p className="text-3xl text-gray-900 font-bold">{attendance.daysPresent}</p>
            </div>
          </div>
        </div>

        <div className="bg-red-50 rounded-lg p-6 border border-red-200">
          <div className="flex items-start space-x-3">
            <div className="bg-red-600 p-2 rounded-lg">
              <XCircle className="w-6 h-6 text-white" />
            </div>
            <div className="flex-1">
              <p className="text-sm text-red-600 mb-1">Days Absent</p>
              <p className="text-3xl text-gray-900 font-bold">{attendance.daysAbsent}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-gray-50 rounded-lg p-6 border border-gray-200">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Attendance Breakdown</h3>
        <div className="space-y-3">
          <div className="flex items-center">
            <div className="w-32 text-gray-700 font-medium">Present:</div>
            <div className="flex-1">
              <div className="bg-gray-200 rounded-full h-6 overflow-hidden">
                <div
                  className="bg-green-500 h-full flex items-center justify-end px-3 transition-all duration-500"
                  style={{ width: `${attendance.percentage}%` }}
                >
                  <span className="text-white text-sm font-semibold">{attendance.percentage}%</span>
                </div>
              </div>
            </div>
          </div>
          <div className="flex items-center">
            <div className="w-32 text-gray-700 font-medium">Absent:</div>
            <div className="flex-1">
              <div className="bg-gray-200 rounded-full h-6 overflow-hidden">
                <div
                  className="bg-red-500 h-full flex items-center justify-end px-3 transition-all duration-500"
                  style={{ width: `${(attendance.daysAbsent / attendance.totalDays) * 100}%` }}
                >
                  <span className="text-white text-sm font-semibold">
                    {((attendance.daysAbsent / attendance.totalDays) * 100).toFixed(1)}%
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AttendanceTab;
