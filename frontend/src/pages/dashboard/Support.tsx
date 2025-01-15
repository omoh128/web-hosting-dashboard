// src/dashboard/Support.tsx
import React from 'react';

const Support = () => {
  return (
    <div className="p-6 bg-white rounded-lg shadow-md">
      <h1 className="text-2xl font-bold mb-4">Support</h1>
      <p className="text-gray-700 mb-4">
        Need help? Contact our support team or explore our help center.
      </p>
      <ul className="list-disc ml-6 text-gray-700">
        <li>Email: <a href="mailto:support@example.com" className="text-blue-600">support@example.com</a></li>
        <li>Phone: +1 234 567 890</li>
        <li>
          <a href="/help-center" className="text-blue-600 underline">Visit our Help Center</a>
        </li>
      </ul>
    </div>
  );
};

export default Support;
