'use client'

import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

interface OutputChartProps {
  data: Array<{
    letter: string;
    percentage: number;
  }>;
}

const OutputChart = ({ data }: OutputChartProps) => {
  return (
    <div className="mt-8">
      <h2 className="text-xl font-semibold mb-4">Letter Frequency</h2>
      <div className="h-96 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="letter" />
            <YAxis 
              label={{ 
                value: 'Percentage (%)', 
                angle: -90, 
                position: 'insideLeft' 
              }} 
            />
            <Tooltip 
              formatter={(value) => 
                typeof value === 'number' ? [`${value.toFixed(2)}%`, 'Frequency'] : [value, 'Frequency']
              }
            />
            <Bar dataKey="percentage" fill="#8884d8" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default OutputChart;