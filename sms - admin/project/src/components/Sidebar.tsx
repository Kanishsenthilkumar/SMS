import { Home, UserPlus, Users, Search, BarChart3, Settings } from 'lucide-react';

interface SidebarProps {
  activePage: string;
  onNavigate: (page: string) => void;
}

const Sidebar = ({ activePage, onNavigate }: SidebarProps) => {
  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: Home },
    { id: 'add-student', label: 'Add New Student', icon: UserPlus },
    { id: 'view-students', label: 'View All Students', icon: Users },
    { id: 'search', label: 'Search/Filter', icon: Search },
    { id: 'reports', label: 'Reports', icon: BarChart3 },
    { id: 'settings', label: 'Settings', icon: Settings },
  ];

  return (
    <aside className="fixed left-0 top-0 h-full w-64 bg-[#1a1a2e] border-r border-[#0f3460] flex flex-col">
      <div className="p-6 border-b border-[#0f3460]">
        <h1 className="text-2xl font-bold text-white tracking-tight">SMS Admin</h1>
        <p className="text-gray-400 text-sm mt-1">Student Management</p>
      </div>

      <nav className="flex-1 p-4 space-y-2">
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = activePage === item.id;

          return (
            <button
              key={item.id}
              onClick={() => onNavigate(item.id)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 ${
                isActive
                  ? 'bg-[#0f3460] text-white shadow-lg shadow-[#0f3460]/50'
                  : 'text-gray-400 hover:text-white hover:bg-[#16213e]'
              }`}
            >
              <Icon size={20} />
              <span className="font-medium">{item.label}</span>
            </button>
          );
        })}
      </nav>

      <div className="p-4 border-t border-[#0f3460]">
        <div className="bg-[#16213e] rounded-lg p-4">
          <p className="text-xs text-gray-400 mb-1">Logged in as</p>
          <p className="text-sm font-semibold text-white">Admin User</p>
          <p className="text-xs text-gray-500">admin@sms.edu</p>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
