import React, { useEffect } from 'react';

function Toast({ message, show, onClose }) {
  useEffect(() => {
    if (show) {
      const timer = setTimeout(() => {
        onClose();
      }, 3000); // Popup disappears after 3 seconds
      return () => clearTimeout(timer);
    }
  }, [show, onClose]);

  if (!show) return null;

  return (
    <div className="fixed bottom-4 right-4 z-50">
      <div className="bg-indigo-600 text-white px-6 py-3 rounded-lg shadow-lg flex items-center space-x-4 animate-slideIn">
        <span>{message}</span>
      </div>
    </div>
  );
}

export default Toast;
