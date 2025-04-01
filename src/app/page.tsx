'use client'

import { useState } from 'react';
import InputForm from './components/InputForm';
import OutputDisplay from './components/OutputDisplay';

export default function Home() {
  const [inputText, setInputText] = useState('');
  const [secretKey, setSecretKey] = useState('');
  const [algorithm, setAlgorithm] = useState('aes-256-cbc');
  const [operation, setOperation] = useState('encrypt');
  const [outputText, setOutputText] = useState('');
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      const response = await fetch('/api/crypto', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          text: inputText,
          algorithm,
          operation,
          key: secretKey
        }),
      });
      
      const data = await response.json();
      
      if (data.result) {
        setOutputText(data.result);
      } else if (data.error) {
        setOutputText(`Error: ${data.error}`);
      }
    } catch (error) {
      setOutputText(`Error: ${error instanceof Error ? error.message : 'Unknown error occurred'}`);
    }
  };
  
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Cryptography Explorer</h1>
      
      <InputForm
        inputText={inputText}
        setInputText={setInputText}
        secretKey={secretKey}
        setSecretKey={setSecretKey}
        algorithm={algorithm}
        setAlgorithm={setAlgorithm}
        operation={operation}
        setOperation={setOperation}
        handleSubmit={handleSubmit}
      />
      
      <OutputDisplay outputText={outputText} />
    </div>
  );
}