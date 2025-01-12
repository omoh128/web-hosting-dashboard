// src/components/layout/Header.tsx
import React from 'react';

const Header: React.FC = () => {
  return (
    <header className="bg-white shadow p-4 flex justify-between items-center">
      <h1 className="text-xl font-bold">Dashboard</h1>
      <div className="flex items-center space-x-4">
        <button className="px-3 py-2 bg-gray-200 rounded hover:bg-gray-300">
          Notifications
        </button>
        <button className="px-3 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
          Logout
        </button>
      </div>
    </header>
  );
};

export default Header;
