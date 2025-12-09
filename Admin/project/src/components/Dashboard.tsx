import { TrendingUp, UserCheck, AlertCircle, Activity } from 'lucide-react';

const Dashboard = () => {
  const stats = [
    {
      label: 'Total Students',
      value: '1,245',
      icon: UserCheck,
      color: 'bg-blue-500',
      change: '+12%'
    },
    {
      label: 'New This Month',
      value: '42',
      icon: TrendingUp,
      color: 'bg-green-500',
      change: '+8%'
    },
    {
      label: 'Pending Updates',
      value: '8',
      icon: AlertCircle,
      color: 'bg-yellow-500',
      change: '-3'
    },
    {
      label: 'Active Today',
      value: '312',
      icon: Activity,
      color: 'bg-purple-500',
      change: '+5%'
    },
  ];

  const recentActivity = [
    { time: '10:45 AM', action: 'Added', studentName: 'Emma Johnson', adminUser: 'Admin User' },
    { time: '10:32 AM', action: 'Modified', studentName: 'Michael Chen', adminUser: 'Admin User' },
    { time: '10:15 AM', action: 'Added', studentName: 'Sarah Williams', adminUser: 'Admin User' },
    { time: '09:58 AM', action: 'Modified', studentName: 'James Brown', adminUser: 'Admin User' },
    { time: '09:40 AM', action: 'Added', studentName: 'Olivia Martinez', adminUser: 'Admin User' },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-white mb-2">Dashboard</h1>
        <p className="text-gray-400">Welcome back! Here's your overview</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <div
              key={index}
              className="bg-[#1a1a2e] border border-[#0f3460] rounded-xl p-6 hover:shadow-lg hover:shadow-[#0f3460]/30 transition-all duration-300"
            >
              <div className="flex items-start justify-between mb-4">
                <div className={`${stat.color} p-3 rounded-lg`}>
                  <Icon size={24} className="text-white" />
                </div>
                <span className="text-green-400 text-sm font-semibold">{stat.change}</span>
              </div>
              <h3 className="text-3xl font-bold text-white mb-1">{stat.value}</h3>
              <p className="text-gray-400 text-sm">{stat.label}</p>
            </div>
          );
        })}
      </div>

      <div className="bg-[#1a1a2e] border border-[#0f3460] rounded-xl p-6">
        <h2 className="text-xl font-bold text-white mb-6">Recent Activity</h2>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-[#0f3460]">
                <th className="text-left py-3 px-4 text-gray-400 font-semibold text-sm">Time</th>
                <th className="text-left py-3 px-4 text-gray-400 font-semibold text-sm">Action</th>
                <th className="text-left py-3 px-4 text-gray-400 font-semibold text-sm">Student Name</th>
                <th className="text-left py-3 px-4 text-gray-400 font-semibold text-sm">Admin User</th>
              </tr>
            </thead>
            <tbody>
              {recentActivity.map((activity, index) => (
                <tr
                  key={index}
                  className="border-b border-[#16213e] hover:bg-[#16213e] transition-colors"
                >
                  <td className="py-4 px-4 text-gray-300 text-sm">{activity.time}</td>
                  <td className="py-4 px-4">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-semibold ${
                        activity.action === 'Added'
                          ? 'bg-green-500/20 text-green-400'
                          : 'bg-blue-500/20 text-blue-400'
                      }`}
                    >
                      {activity.action}
                    </span>
                  </td>
                  <td className="py-4 px-4 text-white font-medium">{activity.studentName}</td>
                  <td className="py-4 px-4 text-gray-400 text-sm">{activity.adminUser}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
