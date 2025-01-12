import React from 'react';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children: React.ReactNode;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, title, children }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white rounded-lg shadow-lg max-w-md w-full p-6">
        {title && <h3 className="text-lg font-semibold mb-4">{title}</h3>}
        <div>{children}</div>
        <button
          onClick={onClose}
          className="mt-4 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 focus:ring focus:ring-red-300"
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default Modal;
