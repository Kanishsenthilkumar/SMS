import { useEffect, useState } from 'react';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import SearchBar from './components/SearchBar';
import StudentProfile from './components/StudentProfile';
import EmptyState from './components/EmptyState';
import { Student } from './types/student';

function App() {
  const [currentView, setCurrentView] = useState<'dashboard' | 'search' | 'reports' | 'settings'>('dashboard');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedStudent, setSelectedStudent] = useState<Student | null>(null);
  const [searchPerformed, setSearchPerformed] = useState(false);
  const [students, setStudents] = useState<Student[]>([]);
  const totalStudents = students.length;

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const res = await fetch('http://localhost:5000/api/students');
        if (!res.ok) {
          console.error('Failed to load students');
          return;
        }
        const data = await res.json();

        // Map backend student shape to frontend Student type
        const mapped: Student[] = data.map((s: any) => {
          const fullName = `${s.firstName} ${s.lastName}`.trim();
          return {
            id: s.studentId,
            name: fullName || s.studentId,
            class: s.grade ? `Grade ${s.grade}` : 'N/A',
            rollNumber: s.studentId,
            status: 'Active',
            personalDetails: {
              dateOfBirth: s.dob || '',
              gender: s.gender || '',
              email: s.email || '',
              phone: s.phone || '',
              parentName: s.guardianName || '',
              address: s.address || '',
            },
            academicRecords: {
              currentSubjects: Array.isArray(s.subjects) ? s.subjects : [],
              previousGrades: [],
              teacherRemarks: '',
            },
            attendance: {
              percentage: 0,
              daysPresent: 0,
              daysAbsent: 0,
              totalDays: 0,
            },
            feeStatus: {
              status: 'Pending',
              dueAmount: 0,
              paymentHistory: [],
            },
          };
        });

        setStudents(mapped);
      } catch (error) {
        console.error('Error fetching students', error);
      }
    };

    fetchStudents();
  }, []);

  const handleSearch = (query: string) => {
    // Called only when user explicitly submits (button or Enter)
    setSearchPerformed(true);

    if (!query.trim()) {
      setSelectedStudent(null);
      setSearchPerformed(false);
      return;
    }

    const lower = query.toLowerCase();
    const found = students.find(
      (student) =>
        student.id.toLowerCase().includes(lower) ||
        student.name.toLowerCase().includes(lower) ||
        student.class.toLowerCase().includes(lower)
    );

    if (!found) {
      setSelectedStudent(null);
      // Simple browser popup warning
      window.alert('No student found. Please check the ID, name, or class and try again.');
      return;
    }

    setSelectedStudent(found);
  };

  const handleClearSearch = () => {
    setSearchQuery('');
    setSelectedStudent(null);
    setSearchPerformed(false);
  };

  return (
    <div className="min-h-screen bg-[#f8fafc] font-['Inter',sans-serif]">
      <Header studentName={selectedStudent?.name} />

      <div className="flex">
        <Sidebar currentView={currentView} onViewChange={setCurrentView} />

        <main className="flex-1 ml-64 p-8 space-y-8">
          {currentView === 'dashboard' && (
            <>
              {/* Top stats similar to admin dashboard */}
              <div>
                <h1 className="text-3xl font-bold text-gray-900 mb-2">Welcome to your Student Portal</h1>
                <p className="text-gray-600">
                  View your academic details, attendance, and fee status in one place.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
                  <p className="text-sm text-gray-500 mb-1">Total Students</p>
                  <p className="text-3xl font-bold text-gray-900">{totalStudents}</p>
                  <p className="text-xs text-gray-400 mt-1">Students available in this portal</p>
                </div>
                <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
                  <p className="text-sm text-gray-500 mb-1">Search Students</p>
                  <p className="text-lg font-semibold text-gray-900 mb-1">
                    Find details by ID, name or class
                  </p>
                  <p className="text-xs text-gray-400">
                    Use the search page to quickly open a student profile.
                  </p>
                </div>
                <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
                  <p className="text-sm text-gray-500 mb-1">Quick Tip</p>
                  <p className="text-lg font-semibold text-gray-900 mb-1">
                    Click a student in the list to view full profile
                  </p>
                  <p className="text-xs text-gray-400">
                    The profile page shows personal, academic, attendance and fee details.
                  </p>
                </div>
              </div>

              {/* Student directory table similar to admin ViewStudents */}
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                <div className="p-6 border-b border-gray-200 flex items-center justify-between">
                  <div>
                    <h2 className="text-xl font-bold text-gray-900">Student Directory</h2>
                    <p className="text-gray-500 text-sm mt-1">
                      Total: {students.length} students
                    </p>
                  </div>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="text-left py-3 px-6 text-gray-500 font-semibold text-xs uppercase tracking-wide">
                          Student ID
                        </th>
                        <th className="text-left py-3 px-6 text-gray-500 font-semibold text-xs uppercase tracking-wide">
                          Name
                        </th>
                        <th className="text-left py-3 px-6 text-gray-500 font-semibold text-xs uppercase tracking-wide">
                          Class
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {students.length > 0 ? (
                        students.map((student) => (
                          <tr
                            key={student.id}
                            className="border-t border-gray-100 hover:bg-gray-50 cursor-pointer"
                            onClick={() => {
                              setSelectedStudent(student);
                              setCurrentView('search');
                              setSearchQuery(student.id);
                              setSearchPerformed(true);
                            }}
                          >
                            <td className="py-3 px-6 text-sm text-gray-700 font-mono">
                              {student.id}
                            </td>
                            <td className="py-3 px-6 text-sm text-gray-900 font-medium">
                              {student.name}
                            </td>
                            <td className="py-3 px-6 text-sm text-gray-700">
                              {student.class}
                            </td>
                          </tr>
                        ))
                      ) : (
                        <tr>
                          <td
                            colSpan={3}
                            className="py-8 px-6 text-center text-sm text-gray-400"
                          >
                            No students available yet. Ask your administrator to add students
                            in the admin portal.
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            </>
          )}

          {currentView === 'search' && (
            <>
              <SearchBar
                value={searchQuery}
                onChange={(value) => {
                  setSearchQuery(value);
                  // Do not search immediately; wait for button click / Enter
                }}
                onClear={handleClearSearch}
                onSearch={() => handleSearch(searchQuery)}
              />

              <div className="mt-8">
                {!searchPerformed && !selectedStudent && (
                  <EmptyState
                    type="initial"
                    message="Enter a Student ID to view profile"
                  />
                )}

                {searchPerformed && !selectedStudent && (
                  <EmptyState
                    type="notFound"
                    message="No student found. Please check the ID and try again."
                  />
                )}

                {selectedStudent && <StudentProfile student={selectedStudent} />}
              </div>
            </>
          )}

          {currentView === 'reports' && (
            <div className="bg-white rounded-xl shadow-sm p-8 border border-gray-100">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">Reports</h2>
              <p className="text-gray-600">Generate and view student reports here.</p>
            </div>
          )}

          {currentView === 'settings' && (
            <div className="bg-white rounded-xl shadow-sm p-8 border border-gray-100">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">Settings</h2>
              <p className="text-gray-600">Configure portal settings and preferences.</p>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}

export default App;
