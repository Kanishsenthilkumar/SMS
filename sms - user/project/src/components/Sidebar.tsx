import { LayoutDashboard, Search, FileText, Settings } from 'lucide-react';

interface SidebarProps {
  currentView: 'dashboard' | 'search' | 'reports' | 'settings';
  onViewChange: (view: 'dashboard' | 'search' | 'reports' | 'settings') => void;
}

function Sidebar({ currentView, onViewChange }: SidebarProps) {
  const menuItems = [
    { id: 'dashboard' as const, label: 'Dashboard', icon: LayoutDashboard },
    { id: 'search' as const, label: 'Search Students', icon: Search },
    { id: 'reports' as const, label: 'Reports', icon: FileText },
    { id: 'settings' as const, label: 'Settings', icon: Settings },
  ];

  return (
    <aside className="fixed left-0 top-[73px] h-[calc(100vh-73px)] w-64 bg-white border-r border-gray-200 shadow-sm">
      <nav className="p-4 space-y-2">
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = currentView === item.id;

          return (
            <button
              key={item.id}
              onClick={() => onViewChange(item.id)}
              className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-all duration-200 ${
                isActive
                  ? 'bg-[#3b82f6] text-white shadow-md'
                  : 'text-gray-700 hover:bg-gray-100'
              }`}
            >
              <Icon className="w-5 h-5" />
              <span className="font-medium">{item.label}</span>
            </button>
          );
        })}
      </nav>
    </aside>
  );
}

export default Sidebar;
