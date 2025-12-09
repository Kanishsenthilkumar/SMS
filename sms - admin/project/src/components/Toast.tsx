import { CheckCircle, XCircle, X } from 'lucide-react';
import { useEffect } from 'react';

interface ToastProps {
  message: string;
  type: 'success' | 'error';
  onClose: () => void;
}

const Toast = ({ message, type, onClose }: ToastProps) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, 3000);

    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <div
      className={`fixed top-6 right-6 z-50 flex items-center gap-3 px-6 py-4 rounded-lg shadow-lg border animate-slide-in ${
        type === 'success'
          ? 'bg-green-500/20 border-green-500 text-green-400'
          : 'bg-red-500/20 border-red-500 text-red-400'
      }`}
    >
      {type === 'success' ? <CheckCircle size={20} /> : <XCircle size={20} />}
      <p className="font-medium">{message}</p>
      <button onClick={onClose} className="ml-4 hover:opacity-70 transition-opacity">
        <X size={18} />
      </button>
    </div>
  );
};

export default Toast;
