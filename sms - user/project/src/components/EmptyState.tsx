import { Search, AlertCircle } from 'lucide-react';

interface EmptyStateProps {
  type: 'initial' | 'notFound';
  message: string;
}

function EmptyState({ type, message }: EmptyStateProps) {
  const Icon = type === 'initial' ? Search : AlertCircle;
  const bgColor = type === 'initial' ? 'bg-blue-50' : 'bg-amber-50';
  const iconColor = type === 'initial' ? 'text-[#3b82f6]' : 'text-amber-500';

  return (
    <div className="bg-white rounded-xl shadow-sm p-16 border border-gray-100 text-center">
      <div className={`inline-flex items-center justify-center w-20 h-20 ${bgColor} rounded-full mb-6`}>
        <Icon className={`w-10 h-10 ${iconColor}`} />
      </div>
      <p className="text-xl text-gray-600 font-medium">{message}</p>
    </div>
  );
}

export default EmptyState;
