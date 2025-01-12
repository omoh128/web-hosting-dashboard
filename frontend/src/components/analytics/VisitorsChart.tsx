import React from 'react';
import { 
  AreaChart, Area, XAxis, YAxis, CartesianGrid, 
  Tooltip, ResponsiveContainer 
} from 'recharts';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface VisitorData {
  date: string;
  visitors: number;
  uniqueVisitors: number;
}

interface VisitorsChartProps {
  data: VisitorData[];
  timeframe?: '7d' | '30d' | '90d';
}

const VisitorsChart = ({ data, timeframe = '30d' }: VisitorsChartProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Website Visitors</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={data}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis 
                dataKey="date"
                tick={{ fontSize: 12 }}
                tickFormatter={(date) => new Date(date).toLocaleDateString()}
              />
              <YAxis 
                tick={{ fontSize: 12 }}
                tickFormatter={(value) => value.toLocaleString()}
              />
              <Tooltip 
                formatter={(value: number) => [value.toLocaleString(), 'Visitors']}
                labelFormatter={(label) => new Date(label).toLocaleDateString()}
              />
              <Area 
                type="monotone" 
                dataKey="visitors" 
                stackId="1"
                stroke="#2563eb" 
                fill="#93c5fd" 
                name="Total Visitors"
              />
              <Area 
                type="monotone" 
                dataKey="uniqueVisitors" 
                stackId="2"
                stroke="#0284c7" 
                fill="#bae6fd" 
                name="Unique Visitors"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
};

export default VisitorsChart;