'use client';

interface TextInputProps {
    inputText: string;
    setInputText: (text: string) => void;
    updateChartData: (data: Array<{letter: string, percentage: number}>) => void;
  }
  
  const TextInput = ({ inputText, setInputText, updateChartData }: TextInputProps) => {
    const analyzeText = () => {
      const alphabet = 'abcdefghijklmnopqrstuvwxyz'.split('');
      
      const letterCounts: Record<string, number> = {};
      for (let i = 0; i < alphabet.length; i++) {
        letterCounts[alphabet[i]] = 0;
      }
      
      const text = inputText.toLowerCase();
      for (let i = 0; i < text.length; i++) {
        const char = text[i];
        if (letterCounts.hasOwnProperty(char)) {
          letterCounts[char]++;
        }
      }
      
      let total = 0;
      for (let i = 0; i < alphabet.length; i++) {
        total += letterCounts[alphabet[i]];
      }
      
      const chartData = [];
      for (let i = 0; i < alphabet.length; i++) {
        const letter = alphabet[i];
        let percentage = 0;
        if (total > 0) {
          percentage = (letterCounts[letter] / total) * 100;
        }
        chartData.push({ letter: letter, percentage: parseFloat(percentage.toFixed(2)) });
      }
      
      updateChartData(chartData);
    };
    
    return (
      <div className="mb-8">
        <textarea
          rows={5}
          placeholder="Enter text to analyze..."
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded mb-4"
        ></textarea>
        <button
          onClick={analyzeText}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors"
        >
          Analyze Text
        </button>
      </div>
    );
  };
  
  export default TextInput;