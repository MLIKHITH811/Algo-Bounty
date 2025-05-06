import React, { useEffect } from 'react';
import { CheckCircle, AlertCircle, X } from 'lucide-react';

interface ToastProps {
  message: string;
  type?: 'success' | 'error';
  onClose: () => void;
}

const Toast: React.FC<ToastProps> = ({ message, type = 'success', onClose }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, 5000);

    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <div className={`fixed bottom-4 right-4 flex items-center p-4 rounded-lg shadow-lg ${
      type === 'success' ? 'bg-green-50 text-green-800' : 'bg-red-50 text-red-800'
    }`}>
      <div className="flex items-center">
        {type === 'success' ? (
          <CheckCircle size={20} className="text-green-500 mr-2" />
        ) : (
          <AlertCircle size={20} className="text-red-500 mr-2" />
        )}
        <p className="text-sm font-medium">{message}</p>
      </div>
      <button
        onClick={onClose}
        className="ml-4 text-slate-400 hover:text-slate-500"
      >
        <X size={16} />
      </button>
    </div>
  );
};

export default Toast;