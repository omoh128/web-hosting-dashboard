// src/components/layout/Sidebar.tsx
import React from 'react';
import { Link } from 'react-router-dom';

const Sidebar: React.FC = () => {
  return (
    <aside className="w-64 bg-gray-800 text-white flex flex-col p-4">
      <h2 className="text-lg font-bold mb-4">Dashboard</h2>
      <nav>
        <ul>
          <li className="mb-2">
            <Link to="/dashboard" className="block px-3 py-2 hover:bg-gray-700 rounded">
              Overview
            </Link>
          </li>
          <li className="mb-2">
            <Link to="/dashboard/domains" className="block px-3 py-2 hover:bg-gray-700 rounded">
              Domains
            </Link>
          </li>
          <li className="mb-2">
            <Link to="/dashboard/analytics" className="block px-3 py-2 hover:bg-gray-700 rounded">
              Analytics
            </Link>
          </li>
          <li className="mb-2">
            <Link to="/dashboard/support" className="block px-3 py-2 hover:bg-gray-700 rounded">
              Support
            </Link>
          </li>
          <li>
            <Link to="/dashboard/settings" className="block px-3 py-2 hover:bg-gray-700 rounded">
              Settings
            </Link>
          </li>
        </ul>
      </nav>
    </aside>
  );
};

export default Sidebar;
