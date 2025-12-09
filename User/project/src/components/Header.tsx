import { GraduationCap, User } from 'lucide-react';

interface HeaderProps {
  studentName?: string;
}

function Header({ studentName }: HeaderProps) {
  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-50 shadow-sm">
      <div className="px-8 py-4 flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="bg-[#3b82f6] p-2 rounded-lg">
            <GraduationCap className="w-6 h-6 text-white" />
          </div>
          <h1 className="text-xl font-bold text-gray-900">Student Portal</h1>
        </div>

        <div className="flex items-center space-x-4">
          <p className="text-gray-700 font-medium">
            Hello, {studentName || 'Guest'}!
          </p>
          <div className="w-10 h-10 bg-[#3b82f6] rounded-full flex items-center justify-center">
            <User className="w-5 h-5 text-white" />
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;
