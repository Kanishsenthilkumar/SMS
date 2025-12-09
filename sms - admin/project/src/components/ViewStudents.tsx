import { useEffect, useState } from 'react';
import { Edit, Trash2, Eye } from 'lucide-react';

interface StudentRow {
  _id: string;
  id: string; // studentId
  name: string;
  email: string;
  grade: string;
  guardianName: string;
  phone: string;
  status: 'Active' | 'Inactive';
}

const ViewStudents = () => {
  const [students, setStudents] = useState<StudentRow[]>([]);
  const [selectedStudent, setSelectedStudent] = useState<StudentRow | null>(null);
  const [editingStudent, setEditingStudent] = useState<StudentRow | null>(null);
  const [editForm, setEditForm] = useState({
    email: '',
    grade: '',
    guardianName: '',
    phone: '',
  });
  const [loading, setLoading] = useState(false);
  const [savingEdit, setSavingEdit] = useState(false);

  const fetchStudents = async () => {
    try {
      setLoading(true);
      const res = await fetch('http://localhost:5000/api/students');
      if (!res.ok) {
        console.error('Failed to load students');
        return;
      }
      const data = await res.json();
      const mapped: StudentRow[] = data.map((s: any) => ({
        _id: s._id,
        id: s.studentId,
        name: `${s.firstName} ${s.lastName}`.trim() || s.studentId,
        email: s.email || '',
        grade: s.grade || 'N/A',
        guardianName: s.guardianName || '',
        phone: s.phone || '',
        status: 'Active',
      }));
      setStudents(mapped);
    } catch (err) {
      console.error('Error fetching students', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStudents();
  }, []);

  const handleView = (student: StudentRow) => {
    setSelectedStudent(student);
  };

  const startEdit = (student: StudentRow) => {
    setEditingStudent(student);
    setEditForm({
      email: student.email,
      grade: student.grade,
      guardianName: student.guardianName,
      phone: student.phone,
    });
  };

  const handleEditChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setEditForm((prev) => ({ ...prev, [name]: value }));
  };

  const submitEdit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingStudent) return;

    try {
      setSavingEdit(true);
      const res = await fetch(
        `http://localhost:5000/api/admin/students/${editingStudent._id}`,
        {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            email: editForm.email,
            grade: editForm.grade,
            guardianName: editForm.guardianName,
            phone: editForm.phone,
          }),
        }
      );

      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        const message = (data as any).error || 'Failed to update student';
        alert(message);
        return;
      }

      const updated = await res.json();

      setStudents((prev) =>
        prev.map((s) =>
          s._id === editingStudent._id
            ? {
                ...s,
                email: updated.email || s.email,
                grade: updated.grade || s.grade,
                guardianName: updated.guardianName || s.guardianName,
                phone: updated.phone || s.phone,
              }
            : s
        )
      );

      setEditingStudent(null);
    } catch (err) {
      console.error('Error updating student', err);
      alert('Unexpected error updating student.');
    } finally {
      setSavingEdit(false);
    }
  };

  const handleDelete = async (student: StudentRow) => {
    const confirmed = window.confirm(`Are you sure you want to delete ${student.name}?`);
    if (!confirmed) return;

    try {
      const res = await fetch(`http://localhost:5000/api/admin/students/${student._id}`, {
        method: 'DELETE',
      });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        const message = (data as any).error || 'Failed to delete student';
        alert(message);
        return;
      }

      setStudents((prev) => prev.filter((s) => s._id !== student._id));
      if (selectedStudent?._id === student._id) {
        setSelectedStudent(null);
      }
    } catch (err) {
      console.error('Error deleting student', err);
      alert('Unexpected error deleting student.');
    }
  };

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-white mb-2">View All Students</h1>
        <p className="text-gray-400">Manage and view all registered students</p>
      </div>

      <div className="bg-[#1a1a2e] border border-[#0f3460] rounded-xl overflow-hidden">
        <div className="p-6 border-b border-[#0f3460] flex items-center justify-between">
          <div>
            <h2 className="text-xl font-bold text-white">Student Directory</h2>
            <p className="text-gray-400 text-sm mt-1">
              {loading ? 'Loading students...' : `Total: ${students.length} students`}
            </p>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-[#16213e]">
              <tr>
                <th className="text-left py-4 px-6 text-gray-300 font-semibold text-sm">Student ID</th>
                <th className="text-left py-4 px-6 text-gray-300 font-semibold text-sm">Name</th>
                <th className="text-left py-4 px-6 text-gray-300 font-semibold text-sm">Email</th>
                <th className="text-left py-4 px-6 text-gray-300 font-semibold text-sm">Grade</th>
                <th className="text-left py-4 px-6 text-gray-300 font-semibold text-sm">Guardian</th>
                <th className="text-left py-4 px-6 text-gray-300 font-semibold text-sm">Phone</th>
                <th className="text-left py-4 px-6 text-gray-300 font-semibold text-sm">Status</th>
                <th className="text-left py-4 px-6 text-gray-300 font-semibold text-sm">Actions</th>
              </tr>
            </thead>
            <tbody>
              {students.map((student) => (
                <tr
                  key={student.id}
                  className="border-b border-[#16213e] hover:bg-[#16213e] transition-colors"
                >
                  <td className="py-4 px-6 text-gray-400 text-sm font-mono">{student.id}</td>
                  <td className="py-4 px-6 text-white font-medium">{student.name}</td>
                  <td className="py-4 px-6 text-gray-400 text-sm">{student.email}</td>
                  <td className="py-4 px-6 text-gray-300">Grade {student.grade}</td>
                  <td className="py-4 px-6 text-gray-400 text-sm">{student.guardianName}</td>
                  <td className="py-4 px-6 text-gray-400 text-sm">{student.phone}</td>
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
                  <td className="py-4 px-6">
                    <div className="flex gap-2">
                      <button
                        onClick={() => handleView(student)}
                        className="p-2 bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors"
                      >
                        <Eye size={16} className="text-white" />
                      </button>
                      <button
                        onClick={() => startEdit(student)}
                        className="p-2 bg-yellow-600 hover:bg-yellow-700 rounded-lg transition-colors"
                        title="Edit student"
                      >
                        <Edit size={16} className="text-white" />
                      </button>
                      <button
                        onClick={() => handleDelete(student)}
                        className="p-2 bg-red-600 hover:bg-red-700 rounded-lg transition-colors"
                      >
                        <Trash2 size={16} className="text-white" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {selectedStudent && (
        <div className="mt-6 bg-[#1a1a2e] border border-[#0f3460] rounded-xl p-6">
          <h2 className="text-xl font-bold text-white mb-4">Student Details</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
            <div>
              <p className="text-gray-400">Student ID</p>
              <p className="text-white font-medium">{selectedStudent.id}</p>
            </div>
            <div>
              <p className="text-gray-400">Name</p>
              <p className="text-white font-medium">{selectedStudent.name}</p>
            </div>
            <div>
              <p className="text-gray-400">Email</p>
              <p className="text-white font-medium">{selectedStudent.email}</p>
            </div>
            <div>
              <p className="text-gray-400">Grade</p>
              <p className="text-white font-medium">Grade {selectedStudent.grade}</p>
            </div>
            <div>
              <p className="text-gray-400">Guardian</p>
              <p className="text-white font-medium">{selectedStudent.guardianName}</p>
            </div>
            <div>
              <p className="text-gray-400">Phone</p>
              <p className="text-white font-medium">{selectedStudent.phone}</p>
            </div>
          </div>
        </div>
      )}

      {editingStudent && (
        <div className="mt-6 bg-[#1a1a2e] border border-[#0f3460] rounded-xl p-6">
          <h2 className="text-xl font-bold text-white mb-4">Edit Student</h2>
          <form onSubmit={submitEdit} className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm">
            <div>
              <label className="block text-gray-300 mb-2">Email</label>
              <input
                type="email"
                name="email"
                value={editForm.email}
                onChange={handleEditChange}
                className="w-full bg-[#16213e] border border-[#0f3460] rounded-lg px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-gray-300 mb-2">Grade</label>
              <input
                type="text"
                name="grade"
                value={editForm.grade}
                onChange={handleEditChange}
                className="w-full bg-[#16213e] border border-[#0f3460] rounded-lg px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-gray-300 mb-2">Guardian Name</label>
              <input
                type="text"
                name="guardianName"
                value={editForm.guardianName}
                onChange={handleEditChange}
                className="w-full bg-[#16213e] border border-[#0f3460] rounded-lg px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-gray-300 mb-2">Phone</label>
              <input
                type="text"
                name="phone"
                value={editForm.phone}
                onChange={handleEditChange}
                className="w-full bg-[#16213e] border border-[#0f3460] rounded-lg px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div className="md:col-span-2 flex gap-3 justify-end pt-2">
              <button
                type="button"
                onClick={() => setEditingStudent(null)}
                className="px-4 py-2 rounded-lg bg-gray-600 hover:bg-gray-700 text-white font-medium"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={savingEdit}
                className="px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-medium disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {savingEdit ? 'Saving...' : 'Save Changes'}
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default ViewStudents;
