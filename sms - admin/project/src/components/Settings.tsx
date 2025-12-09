import { User, Bell, Shield, Database, Palette, Globe } from 'lucide-react';

const Settings = () => {
  const settingsSections = [
    {
      title: 'Profile Settings',
      icon: User,
      color: 'bg-blue-500',
      items: [
        { label: 'Full Name', value: 'Admin User' },
        { label: 'Email', value: 'admin@sms.edu' },
        { label: 'Role', value: 'System Administrator' },
      ],
    },
    {
      title: 'Notifications',
      icon: Bell,
      color: 'bg-yellow-500',
      items: [
        { label: 'Email Notifications', value: 'Enabled', toggle: true },
        { label: 'Student Updates', value: 'Enabled', toggle: true },
        { label: 'System Alerts', value: 'Enabled', toggle: true },
      ],
    },
    {
      title: 'Security',
      icon: Shield,
      color: 'bg-red-500',
      items: [
        { label: 'Two-Factor Authentication', value: 'Enabled', toggle: true },
        { label: 'Session Timeout', value: '30 minutes' },
        { label: 'Last Login', value: 'Dec 7, 2024 9:30 AM' },
      ],
    },
  ];

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-white mb-2">Settings</h1>
        <p className="text-gray-400">Manage your system preferences and configurations</p>
      </div>

      <div className="space-y-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {settingsSections.map((section, index) => {
            const Icon = section.icon;
            return (
              <div
                key={index}
                className="bg-[#1a1a2e] border border-[#0f3460] rounded-xl p-6"
              >
                <div className="flex items-center gap-3 mb-6">
                  <div className={`${section.color} p-2 rounded-lg`}>
                    <Icon size={20} className="text-white" />
                  </div>
                  <h2 className="text-xl font-bold text-white">{section.title}</h2>
                </div>

                <div className="space-y-4">
                  {section.items.map((item, itemIndex) => (
                    <div
                      key={itemIndex}
                      className="flex items-center justify-between p-4 bg-[#16213e] rounded-lg"
                    >
                      <div>
                        <p className="text-white font-medium">{item.label}</p>
                        {!item.toggle && (
                          <p className="text-gray-400 text-sm mt-1">{item.value}</p>
                        )}
                      </div>
                      {item.toggle ? (
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input type="checkbox" className="sr-only peer" defaultChecked />
                          <div className="w-11 h-6 bg-gray-600 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-blue-500 rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                        </label>
                      ) : (
                        <button className="bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold py-2 px-4 rounded-lg transition-colors">
                          Edit
                        </button>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-[#1a1a2e] border border-[#0f3460] rounded-xl p-6">
            <div className="flex items-center gap-3 mb-6">
              <div className="bg-purple-500 p-2 rounded-lg">
                <Database size={20} className="text-white" />
              </div>
              <h2 className="text-xl font-bold text-white">Data Management</h2>
            </div>

            <div className="space-y-3">
              <button className="w-full bg-[#16213e] hover:bg-[#0f3460] text-white font-medium py-3 px-4 rounded-lg transition-colors text-left">
                Export All Student Data
              </button>
              <button className="w-full bg-[#16213e] hover:bg-[#0f3460] text-white font-medium py-3 px-4 rounded-lg transition-colors text-left">
                Import Student Records
              </button>
              <button className="w-full bg-[#16213e] hover:bg-[#0f3460] text-white font-medium py-3 px-4 rounded-lg transition-colors text-left">
                Backup Database
              </button>
              <button className="w-full bg-red-600 hover:bg-red-700 text-white font-medium py-3 px-4 rounded-lg transition-colors text-left">
                Clear Cache
              </button>
            </div>
          </div>

          <div className="bg-[#1a1a2e] border border-[#0f3460] rounded-xl p-6">
            <div className="flex items-center gap-3 mb-6">
              <div className="bg-green-500 p-2 rounded-lg">
                <Palette size={20} className="text-white" />
              </div>
              <h2 className="text-xl font-bold text-white">Appearance</h2>
            </div>

            <div className="space-y-4">
              <div className="p-4 bg-[#16213e] rounded-lg">
                <p className="text-white font-medium mb-2">Theme</p>
                <select className="w-full bg-[#1a1a2e] border border-[#0f3460] rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-500">
                  <option>Dark Mode (Current)</option>
                  <option>Light Mode</option>
                  <option>Auto</option>
                </select>
              </div>

              <div className="p-4 bg-[#16213e] rounded-lg">
                <p className="text-white font-medium mb-2">Language</p>
                <select className="w-full bg-[#1a1a2e] border border-[#0f3460] rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-500">
                  <option>English (US)</option>
                  <option>Spanish</option>
                  <option>French</option>
                </select>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-[#1a1a2e] border border-[#0f3460] rounded-xl p-6">
          <div className="flex items-center gap-3 mb-6">
            <div className="bg-orange-500 p-2 rounded-lg">
              <Globe size={20} className="text-white" />
            </div>
            <h2 className="text-xl font-bold text-white">System Information</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 bg-[#16213e] rounded-lg">
              <p className="text-gray-400 text-sm mb-1">Version</p>
              <p className="text-white font-semibold">SMS v2.4.1</p>
            </div>
            <div className="p-4 bg-[#16213e] rounded-lg">
              <p className="text-gray-400 text-sm mb-1">Last Update</p>
              <p className="text-white font-semibold">Dec 1, 2024</p>
            </div>
            <div className="p-4 bg-[#16213e] rounded-lg">
              <p className="text-gray-400 text-sm mb-1">Database Status</p>
              <p className="text-green-400 font-semibold">Healthy</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;
