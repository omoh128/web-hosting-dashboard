import React from 'react';
import { 
  LineChart, Line, XAxis, YAxis, CartesianGrid, 
  Tooltip, ResponsiveContainer 
} from 'recharts';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface BandwidthData {
  date: string;
  usage: number;
  limit: number;
}

interface BandwidthChartProps {
  data: BandwidthData[];
  timeframe?: '7d' | '30d' | '90d';
}

const BandwidthChart = ({ data, timeframe = '30d' }: BandwidthChartProps) => {
  const formatBytes = (bytes: number) => {
    const units = ['B', 'KB', 'MB', 'GB', 'TB'];
    let value = bytes;
    let unitIndex = 0;
    
    while (value >= 1024 && unitIndex < units.length - 1) {
      value /= 1024;
      unitIndex++;
    }
    
    return `${value.toFixed(2)} ${units[unitIndex]}`;
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Bandwidth Usage</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={data}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis 
                dataKey="date" 
                tick={{ fontSize: 12 }}
                tickFormatter={(date) => new Date(date).toLocaleDateString()}
              />
              <YAxis 
                tickFormatter={formatBytes}
                tick={{ fontSize: 12 }}
              />
              <Tooltip 
                formatter={(value: number) => [formatBytes(value), 'Usage']}
                labelFormatter={(label) => new Date(label).toLocaleDateString()}
              />
              <Line 
                type="monotone" 
                dataKey="usage" 
                stroke="#2563eb" 
                strokeWidth={2}
                dot={false}
              />
              <Line 
                type="monotone" 
                dataKey="limit" 
                stroke="#dc2626" 
                strokeDasharray="5 5"
                dot={false}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
};

export default BandwidthChart;



