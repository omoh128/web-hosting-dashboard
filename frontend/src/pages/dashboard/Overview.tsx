// src/dashboard/Overview.tsx
import React from 'react';

const Overview = () => {
  return (
    <div className="p-6 bg-white rounded-lg shadow-md">
      <h1 className="text-2xl font-bold mb-4">Overview</h1>
      <p className="text-gray-700">
        Welcome to your dashboard! Here you can quickly see an overview of your account.
      </p>
      {/* Add summary metrics or recent activity here */}
      <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="p-4 bg-blue-50 rounded-md shadow">
          <h2 className="text-lg font-semibold">Visitors</h2>
          <p className="text-xl font-bold">1,234</p>
        </div>
        <div className="p-4 bg-green-50 rounded-md shadow">
          <h2 className="text-lg font-semibold">Domains</h2>
          <p className="text-xl font-bold">12</p>
        </div>
        {/* Add more cards as needed */}
      </div>
    </div>
  );
};

export default Overview;
