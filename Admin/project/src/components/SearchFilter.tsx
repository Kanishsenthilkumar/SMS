import { useState } from 'react';
import { Search, Filter, Download } from 'lucide-react';

const SearchFilter = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterGrade, setFilterGrade] = useState('');
  const [filterStatus, setFilterStatus] = useState('');

  const students = [
    {
      id: 'SMS2024-001',
      name: 'Emma Johnson',
      email: 'emma.j@email.com',
      grade: 10,
      status: 'Active',
    },
    {
      id: 'SMS2024-002',
      name: 'Michael Chen',
      email: 'michael.c@email.com',
      grade: 11,
      status: 'Active',
    },
    {
      id: 'SMS2024-003',
      name: 'Sarah Williams',
      email: 'sarah.w@email.com',
      grade: 9,
      status: 'Active',
    },
  ];

  const filteredStudents = students.filter((student) => {
    const matchesSearch =
      student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      student.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      student.email.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesGrade = !filterGrade || student.grade.toString() === filterGrade;
    const matchesStatus = !filterStatus || student.status === filterStatus;

    return matchesSearch && matchesGrade && matchesStatus;
  });

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-white mb-2">Search & Filter Students</h1>
        <p className="text-gray-400">Find students using advanced filters</p>
      </div>

      <div className="space-y-6">
        <div className="bg-[#1a1a2e] border border-[#0f3460] rounded-xl p-6">
          <div className="flex items-center gap-2 mb-6">
            <Filter size={20} className="text-blue-400" />
            <h2 className="text-xl font-bold text-white">Filter Options</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <label className="block text-sm font-semibold text-gray-300 mb-2">Search</label>
              <div className="relative">
                <Search
                  size={20}
                  className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                />
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Name, ID, or Email..."
                  className="w-full bg-[#16213e] border border-[#0f3460] rounded-lg pl-10 pr-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-300 mb-2">Grade</label>
              <select
                value={filterGrade}
                onChange={(e) => setFilterGrade(e.target.value)}
                className="w-full bg-[#16213e] border border-[#0f3460] rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">All Grades</option>
                {Array.from({ length: 12 }, (_, i) => i + 1).map((grade) => (
                  <option key={grade} value={grade}>
                    Grade {grade}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-300 mb-2">Status</label>
              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                className="w-full bg-[#16213e] border border-[#0f3460] rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">All Status</option>
                <option value="Active">Active</option>
                <option value="Inactive">Inactive</option>
              </select>
            </div>
          </div>

          <div className="flex gap-4 mt-6">
            <button className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors flex items-center justify-center gap-2">
              <Search size={20} />
              Search
            </button>
            <button
              onClick={() => {
                setSearchTerm('');
                setFilterGrade('');
                setFilterStatus('');
              }}
              className="bg-gray-600 hover:bg-gray-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors"
            >
              Clear
            </button>
          </div>
        </div>

        <div className="bg-[#1a1a2e] border border-[#0f3460] rounded-xl overflow-hidden">
          <div className="p-6 border-b border-[#0f3460] flex items-center justify-between">
            <div>
              <h2 className="text-xl font-bold text-white">Search Results</h2>
              <p className="text-gray-400 text-sm mt-1">{filteredStudents.length} students found</p>
            </div>
            <button className="bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-4 rounded-lg transition-colors flex items-center gap-2">
              <Download size={18} />
              Export
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-[#16213e]">
                <tr>
                  <th className="text-left py-4 px-6 text-gray-300 font-semibold text-sm">
                    Student ID
                  </th>
                  <th className="text-left py-4 px-6 text-gray-300 font-semibold text-sm">Name</th>
                  <th className="text-left py-4 px-6 text-gray-300 font-semibold text-sm">Email</th>
                  <th className="text-left py-4 px-6 text-gray-300 font-semibold text-sm">Grade</th>
                  <th className="text-left py-4 px-6 text-gray-300 font-semibold text-sm">Status</th>
                </tr>
              </thead>
              <tbody>
                {filteredStudents.length > 0 ? (
                  filteredStudents.map((student) => (
                    <tr
                      key={student.id}
                      className="border-b border-[#16213e] hover:bg-[#16213e] transition-colors"
                    >
                      <td className="py-4 px-6 text-gray-400 text-sm font-mono">{student.id}</td>
                      <td className="py-4 px-6 text-white font-medium">{student.name}</td>
                      <td className="py-4 px-6 text-gray-400 text-sm">{student.email}</td>
                      <td className="py-4 px-6 text-gray-300">Grade {student.grade}</td>
                      <td className="py-4 px-6">
                        <span
                          className={`px-3 py-1 rounded-full text-xs font-semibold ${
                            student.status === 'Active'
                              ? 'bg-green-500/20 text-green-400'
                              : 'bg-gray-500/20 text-gray-400'
                          }`}
                        >
                          {student.status}
                        </span>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={5} className="py-12 text-center text-gray-400">
                      No students found matching your criteria
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchFilter;
