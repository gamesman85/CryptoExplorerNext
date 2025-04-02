'use client'

import { useState } from 'react';
import TextInput from '../components/TextInput';
import OutputChart from '../components/OutputChart';

export default function FrequencyAnalysis() {
  const [inputText, setInputText] = useState('');
  const [chartData, setChartData] = useState<Array<{letter: string, percentage: number}> | null>(null);
  
  const handleInputChange = (text: string) => {
    setInputText(text);
  };

  const updateChartData = (data: Array<{letter: string, percentage: number}>) => {
    setChartData(data);
  };

  return (
    <div className="py-8">
      <h1 className="text-3xl font-bold mb-6">Character Frequency Analyzer</h1>
      <TextInput 
        inputText={inputText} 
        setInputText={handleInputChange}
        updateChartData={updateChartData}
      />
      {chartData && <OutputChart data={chartData} />}
    </div>
  );
}