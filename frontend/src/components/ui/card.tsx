// src/components/ui/card.tsx

import React from 'react';

export const Card = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      {children}
    </div>
  );
};

export const CardHeader = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="bg-gray-100 p-4 border-b">
      <h2 className="text-xl font-semibold">{children}</h2>
    </div>
  );
};

export const CardTitle = ({ children }: { children: React.ReactNode }) => {
  return (
    <h3 className="text-lg font-medium text-gray-900">
      {children}
    </h3>
  );
};

export const CardContent = ({ children }: { children: React.ReactNode }) => {
  return <div className="p-4">{children}</div>;
};
