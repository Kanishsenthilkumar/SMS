import { FileText, Download, TrendingUp, Users, BookOpen, Award } from 'lucide-react';

const Reports = () => {
  const reportCategories = [
    {
      title: 'Student Enrollment Report',
      description: 'Overview of all enrolled students by grade and status',
      icon: Users,
      color: 'bg-blue-500',
      count: '1,245',
    },
    {
      title: 'Academic Performance',
      description: 'Student grades and performance metrics by subject',
      icon: Award,
      color: 'bg-green-500',
      count: '892',
    },
    {
      title: 'Attendance Summary',
      description: 'Monthly attendance records and statistics',
      icon: TrendingUp,
      color: 'bg-purple-500',
      count: '98.5%',
    },
    {
      title: 'Subject Distribution',
      description: 'Students enrolled per subject and class capacity',
      icon: BookOpen,
      color: 'bg-yellow-500',
      count: '24',
    },
  ];

  const recentReports = [
    {
      name: 'Q4 Enrollment Report 2024',
      date: 'Dec 1, 2024',
      size: '2.4 MB',
      type: 'PDF',
    },
    {
      name: 'November Attendance Summary',
      date: 'Nov 30, 2024',
      size: '1.8 MB',
      type: 'Excel',
    },
    {
      name: 'Mid-Year Performance Analysis',
      date: 'Nov 15, 2024',
      size: '3.1 MB',
      type: 'PDF',
    },
    {
      name: 'Grade 12 Graduate List',
      date: 'Nov 10, 2024',
      size: '890 KB',
      type: 'PDF',
    },
  ];

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-white mb-2">Reports</h1>
        <p className="text-gray-400">Generate and view comprehensive reports</p>
      </div>

      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {reportCategories.map((category, index) => {
            const Icon = category.icon;
            return (
              <div
                key={index}
                className="bg-[#1a1a2e] border border-[#0f3460] rounded-xl p-6 hover:shadow-lg hover:shadow-[#0f3460]/30 transition-all duration-300 cursor-pointer group"
              >
                <div className={`${category.color} p-3 rounded-lg w-fit mb-4 group-hover:scale-110 transition-transform`}>
                  <Icon size={24} className="text-white" />
                </div>
                <h3 className="text-2xl font-bold text-white mb-1">{category.count}</h3>
                <h4 className="text-white font-semibold mb-2">{category.title}</h4>
                <p className="text-gray-400 text-sm mb-4">{category.description}</p>
                <button className="w-full bg-[#16213e] hover:bg-[#0f3460] text-white py-2 px-4 rounded-lg transition-colors flex items-center justify-center gap-2">
                  <FileText size={16} />
                  Generate Report
                </button>
              </div>
            );
          })}
        </div>

        <div className="bg-[#1a1a2e] border border-[#0f3460] rounded-xl p-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-xl font-bold text-white">Recent Reports</h2>
              <p className="text-gray-400 text-sm mt-1">Previously generated reports</p>
            </div>
            <button className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg transition-colors flex items-center gap-2">
              <FileText size={18} />
              New Report
            </button>
          </div>

          <div className="space-y-3">
            {recentReports.map((report, index) => (
              <div
                key={index}
                className="bg-[#16213e] border border-[#0f3460] rounded-lg p-4 hover:bg-[#0f3460]/50 transition-colors flex items-center justify-between"
              >
                <div className="flex items-center gap-4">
                  <div className="bg-blue-500/20 p-3 rounded-lg">
                    <FileText size={20} className="text-blue-400" />
                  </div>
                  <div>
                    <h4 className="text-white font-semibold">{report.name}</h4>
                    <p className="text-gray-400 text-sm">
                      {report.date} • {report.size} • {report.type}
                    </p>
                  </div>
                </div>
                <div className="flex gap-2">
                  <button className="bg-blue-600 hover:bg-blue-700 text-white p-2 rounded-lg transition-colors">
                    <Download size={18} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-[#1a1a2e] border border-[#0f3460] rounded-xl p-6">
            <h3 className="text-lg font-bold text-white mb-4">Students by Grade</h3>
            <div className="space-y-3">
              {[
                { grade: 'Grade 9', count: 145, percentage: 80 },
                { grade: 'Grade 10', count: 132, percentage: 73 },
                { grade: 'Grade 11', count: 128, percentage: 71 },
                { grade: 'Grade 12', count: 110, percentage: 61 },
              ].map((item, index) => (
                <div key={index}>
                  <div className="flex justify-between text-sm mb-2">
                    <span className="text-gray-300">{item.grade}</span>
                    <span className="text-white font-semibold">{item.count} students</span>
                  </div>
                  <div className="w-full bg-[#16213e] rounded-full h-2">
                    <div
                      className="bg-blue-500 h-2 rounded-full transition-all duration-500"
                      style={{ width: `${item.percentage}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-[#1a1a2e] border border-[#0f3460] rounded-xl p-6">
            <h3 className="text-lg font-bold text-white mb-4">Top Subjects</h3>
            <div className="space-y-4">
              {[
                { subject: 'Mathematics', students: 456 },
                { subject: 'English', students: 442 },
                { subject: 'Science', students: 398 },
                { subject: 'Computer Science', students: 376 },
              ].map((item, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-3 bg-[#16213e] rounded-lg"
                >
                  <span className="text-gray-300">{item.subject}</span>
                  <span className="text-white font-semibold">{item.students} students</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Reports;
