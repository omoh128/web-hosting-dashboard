// src/components/layout/DashboardLayout.tsx
import React from 'react';
import Sidebar from './Sidebar';
import Header from './Header';

const DashboardLayout: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  return (
    <div className="flex h-screen">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <Header />
        <main className="flex-1 overflow-y-auto p-4 bg-gray-100">{children}</main>
      </div>
    </div>
  );
};

export default DashboardLayout;
