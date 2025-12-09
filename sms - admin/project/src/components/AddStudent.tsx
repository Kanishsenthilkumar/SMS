import { useState } from 'react';
import { Save, X } from 'lucide-react';

interface AddStudentProps {
  onShowToast: (message: string, type: 'success' | 'error') => void;
}

const AddStudent = ({ onShowToast }: AddStudentProps) => {
  const [loading, setLoading] = useState(false);
  const ROLL_PREFIX = 'SMS2024-';
  const [formData, setFormData] = useState({
    studentId: '',
    firstName: '',
    lastName: '',
    dob: '',
    gender: '',
    email: '',
    phone: '',
    guardianName: '',
    emergencyContact: '',
    grade: '',
    subjects: [] as string[],
    address: '',
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  const subjects = [
    'Mathematics',
    'English',
    'Science',
    'History',
    'Geography',
    'Physics',
    'Chemistry',
    'Biology',
    'Computer Science',
    'Art',
    'Music',
    'Physical Education',
  ];

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  const handleRollSuffixChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const raw = e.target.value;
    // allow only digits in suffix
    const digits = raw.replace(/[^0-9]/g, '');
    const fullId = digits ? `${ROLL_PREFIX}${digits}` : '';
    setFormData((prev) => ({ ...prev, studentId: fullId }));
    if (errors.studentId) {
      setErrors((prev) => ({ ...prev, studentId: '' }));
    }
  };

  const handleSubjectToggle = (subject: string) => {
    setFormData((prev) => ({
      ...prev,
      subjects: prev.subjects.includes(subject)
        ? prev.subjects.filter((s) => s !== subject)
        : [...prev.subjects, subject],
    }));
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.studentId.trim()) newErrors.studentId = 'Roll number cannot be empty';
    else if (!formData.studentId.startsWith(ROLL_PREFIX))
      newErrors.studentId = 'Invalid roll number format';
    else {
      const suffix = formData.studentId.slice(ROLL_PREFIX.length);
      if (!suffix || !/^\d+$/.test(suffix)) {
        newErrors.studentId = 'Invalid roll number format';
      }
    }

    if (!formData.firstName.trim()) newErrors.firstName = 'First name is required';
    if (!formData.lastName.trim()) newErrors.lastName = 'Last name is required';
    if (!formData.dob) newErrors.dob = 'Date of birth is required';
    if (!formData.gender) newErrors.gender = 'Gender is required';
    if (!formData.email.trim()) newErrors.email = 'Email is required';
    else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'Email is invalid';
    if (!formData.phone.trim()) newErrors.phone = 'Phone number is required';
    if (!formData.guardianName.trim()) newErrors.guardianName = 'Guardian name is required';
    if (!formData.emergencyContact.trim()) newErrors.emergencyContact = 'Emergency contact is required';
    if (!formData.grade) newErrors.grade = 'Grade is required';
    if (formData.subjects.length === 0) newErrors.subjects = 'Select at least one subject';
    if (!formData.address.trim()) newErrors.address = 'Address is required';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      onShowToast('Please fix the errors in the form', 'error');
      return;
    }

    try {
      setLoading(true);

      const res = await fetch('http://localhost:5000/api/admin/students', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        const message = (data as any).error || 'Failed to save student';
        onShowToast(message, 'error');
        return;
      }

      onShowToast('Student added successfully!', 'success');
      handleClear();
    } catch (error) {
      console.error(error);
      onShowToast('Network error while saving student', 'error');
    } finally {
      setLoading(false);
    }
  };

  const handleClear = () => {
    setFormData({
      studentId: '',
      firstName: '',
      lastName: '',
      dob: '',
      gender: '',
      email: '',
      phone: '',
      guardianName: '',
      emergencyContact: '',
      grade: '',
      subjects: [],
      address: '',
    });
    setErrors({});
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-white mb-2">Add New Student</h1>
        <p className="text-gray-400">Fill in the student information below</p>
      </div>

      <div className="bg-[#1a1a2e] border border-[#0f3460] rounded-xl p-8">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-semibold text-gray-300 mb-2">
              Roll Number <span className="text-red-500">*</span>
            </label>
            <div className="flex gap-2">
              <div className="px-4 py-3 bg-[#0f3460] border border-[#0f3460] rounded-lg text-gray-300 text-sm flex items-center">
                {ROLL_PREFIX}
              </div>
              <input
                type="text"
                name="studentIdSuffix"
                value={
                  formData.studentId.startsWith(ROLL_PREFIX)
                    ? formData.studentId.slice(ROLL_PREFIX.length)
                    : ''
                }
                onChange={handleRollSuffixChange}
                placeholder="001"
                className={`w-full bg-[#16213e] border ${
                  errors.studentId ? 'border-red-500' : 'border-[#0f3460]'
                } rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-blue-500`}
              />
            </div>
            {errors.studentId && (
              <p className="text-red-500 text-xs mt-1">{errors.studentId}</p>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-semibold text-gray-300 mb-2">
                First Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="firstName"
                value={formData.firstName}
                onChange={handleInputChange}
                className={`w-full bg-[#16213e] border ${
                  errors.firstName ? 'border-red-500' : 'border-[#0f3460]'
                } rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-blue-500`}
              />
              {errors.firstName && <p className="text-red-500 text-xs mt-1">{errors.firstName}</p>}
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-300 mb-2">
                Last Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="lastName"
                value={formData.lastName}
                onChange={handleInputChange}
                className={`w-full bg-[#16213e] border ${
                  errors.lastName ? 'border-red-500' : 'border-[#0f3460]'
                } rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-blue-500`}
              />
              {errors.lastName && <p className="text-red-500 text-xs mt-1">{errors.lastName}</p>}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-semibold text-gray-300 mb-2">
                Date of Birth <span className="text-red-500">*</span>
              </label>
              <input
                type="date"
                name="dob"
                value={formData.dob}
                onChange={handleInputChange}
                className={`w-full bg-[#16213e] border ${
                  errors.dob ? 'border-red-500' : 'border-[#0f3460]'
                } rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-blue-500`}
              />
              {errors.dob && <p className="text-red-500 text-xs mt-1">{errors.dob}</p>}
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-300 mb-2">
                Gender <span className="text-red-500">*</span>
              </label>
              <div className="flex gap-6 mt-3">
                {['Male', 'Female', 'Other'].map((option) => (
                  <label key={option} className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="radio"
                      name="gender"
                      value={option}
                      checked={formData.gender === option}
                      onChange={handleInputChange}
                      className="w-4 h-4 text-blue-500 focus:ring-blue-500"
                    />
                    <span className="text-gray-300">{option}</span>
                  </label>
                ))}
              </div>
              {errors.gender && <p className="text-red-500 text-xs mt-1">{errors.gender}</p>}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-semibold text-gray-300 mb-2">
                Contact Email <span className="text-red-500">*</span>
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                className={`w-full bg-[#16213e] border ${
                  errors.email ? 'border-red-500' : 'border-[#0f3460]'
                } rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-blue-500`}
              />
              {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-300 mb-2">
                Phone Number <span className="text-red-500">*</span>
              </label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
                className={`w-full bg-[#16213e] border ${
                  errors.phone ? 'border-red-500' : 'border-[#0f3460]'
                } rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-blue-500`}
              />
              {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone}</p>}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-semibold text-gray-300 mb-2">
                Parent/Guardian Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="guardianName"
                value={formData.guardianName}
                onChange={handleInputChange}
                className={`w-full bg-[#16213e] border ${
                  errors.guardianName ? 'border-red-500' : 'border-[#0f3460]'
                } rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-blue-500`}
              />
              {errors.guardianName && <p className="text-red-500 text-xs mt-1">{errors.guardianName}</p>}
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-300 mb-2">
                Emergency Contact <span className="text-red-500">*</span>
              </label>
              <input
                type="tel"
                name="emergencyContact"
                value={formData.emergencyContact}
                onChange={handleInputChange}
                className={`w-full bg-[#16213e] border ${
                  errors.emergencyContact ? 'border-red-500' : 'border-[#0f3460]'
                } rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-blue-500`}
              />
              {errors.emergencyContact && (
                <p className="text-red-500 text-xs mt-1">{errors.emergencyContact}</p>
              )}
            </div>
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-300 mb-2">
              Current Grade/Class <span className="text-red-500">*</span>
            </label>
            <select
              name="grade"
              value={formData.grade}
              onChange={handleInputChange}
              className={`w-full bg-[#16213e] border ${
                errors.grade ? 'border-red-500' : 'border-[#0f3460]'
              } rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-blue-500`}
            >
              <option value="">Select Grade</option>
              {Array.from({ length: 12 }, (_, i) => i + 1).map((grade) => (
                <option key={grade} value={grade}>
                  Grade {grade}
                </option>
              ))}
            </select>
            {errors.grade && <p className="text-red-500 text-xs mt-1">{errors.grade}</p>}
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-300 mb-2">
              Subjects Enrolled <span className="text-red-500">*</span>
            </label>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              {subjects.map((subject) => (
                <label
                  key={subject}
                  className={`flex items-center gap-2 p-3 rounded-lg border cursor-pointer transition-all ${
                    formData.subjects.includes(subject)
                      ? 'bg-blue-500/20 border-blue-500 text-blue-400'
                      : 'bg-[#16213e] border-[#0f3460] text-gray-300 hover:border-blue-500/50'
                  }`}
                >
                  <input
                    type="checkbox"
                    checked={formData.subjects.includes(subject)}
                    onChange={() => handleSubjectToggle(subject)}
                    className="w-4 h-4 text-blue-500 rounded focus:ring-blue-500"
                  />
                  <span className="text-sm">{subject}</span>
                </label>
              ))}
            </div>
            {errors.subjects && <p className="text-red-500 text-xs mt-1">{errors.subjects}</p>}
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-300 mb-2">
              Address <span className="text-red-500">*</span>
            </label>
            <textarea
              name="address"
              value={formData.address}
              onChange={handleInputChange}
              rows={4}
              className={`w-full bg-[#16213e] border ${
                errors.address ? 'border-red-500' : 'border-[#0f3460]'
              } rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none`}
            />
            {errors.address && <p className="text-red-500 text-xs mt-1">{errors.address}</p>}
          </div>

          <div className="flex gap-4 pt-4">
            <button
              type="submit"
              disabled={loading}
              className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Save size={20} />
              {loading ? 'Saving...' : 'Save Student'}
            </button>
            <button
              type="button"
              onClick={handleClear}
              className="bg-red-600 hover:bg-red-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors flex items-center gap-2"
            >
              <X size={20} />
              Clear Form
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddStudent;
