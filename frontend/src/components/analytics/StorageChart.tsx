import React from 'react';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, 
  Tooltip, ResponsiveContainer 
} from 'recharts';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface StorageData {
  type: string;
  used: number;
  total: number;
}

interface StorageChartProps {
  data: StorageData[];
}

const StorageChart = ({ data }: StorageChartProps) => {
  const formatStorage = (bytes: number) => {
    const gb = bytes / (1024 * 1024 * 1024);
    return `${gb.toFixed(2)} GB`;
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Storage Usage</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="type" tick={{ fontSize: 12 }} />
              <YAxis 
                tickFormatter={formatStorage}
                tick={{ fontSize: 12 }}
              />
              <Tooltip 
                formatter={(value: number) => [formatStorage(value), 'Storage']}
              />
              <Bar 
                dataKey="used" 
                fill="#2563eb" 
                name="Used"
                stackId="storage" 
              />
              <Bar 
                dataKey="total" 
                fill="#93c5fd" 
                name="Available"
                stackId="storage"
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
};

export default StorageChart;