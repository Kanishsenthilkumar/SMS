import { Calendar, Mail, Phone, Users, MapPin, User } from 'lucide-react';
import { Student } from '../../types/student';

interface PersonalDetailsTabProps {
  details: Student['personalDetails'];
}

function PersonalDetailsTab({ details }: PersonalDetailsTabProps) {
  const fields = [
    { label: 'Date of Birth', value: details.dateOfBirth, icon: Calendar },
    { label: 'Gender', value: details.gender, icon: User },
    { label: 'Email', value: details.email, icon: Mail },
    { label: 'Phone', value: details.phone, icon: Phone },
    { label: 'Parent Name', value: details.parentName, icon: Users },
    { label: 'Address', value: details.address, icon: MapPin },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {fields.map((field) => {
        const Icon = field.icon;
        return (
          <div key={field.label} className="bg-gray-50 rounded-lg p-6 border border-gray-200">
            <div className="flex items-start space-x-3">
              <div className="bg-[#3b82f6] p-2 rounded-lg">
                <Icon className="w-5 h-5 text-white" />
              </div>
              <div className="flex-1">
                <p className="text-sm text-gray-500 mb-1">{field.label}</p>
                <p className="text-lg text-gray-900 font-medium">{field.value}</p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default PersonalDetailsTab;
