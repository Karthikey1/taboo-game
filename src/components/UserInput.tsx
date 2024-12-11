import { useState, ChangeEvent } from 'react';
import { useGameStore } from '../store/gameStore';
import { Button } from './Button';
import { verifyExplanation } from '../utils/openai';

interface UserInputProps {
  onCorrectGuess: () => void;
  tabooWords: string[];
  targetWord: string;
}

export function UserInput({ onCorrectGuess, tabooWords, targetWord }: UserInputProps) {
  const [input, setInput] = useState('');
  const [error, setError] = useState('');
  const [isVerifying, setIsVerifying] = useState(false);
  const updateScore = useGameStore((state) => state.updateScore);

  const handleInputChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setInput(e.target.value);
    setError('');
  };

  const handleSubmit = async () => {
    if (input.trim().length < 10) {
      setError('Please provide a longer explanation.');
      return;
    }

    setIsVerifying(true);
    try {
      const result = await verifyExplanation(targetWord, input, tabooWords);
      
      if (result.isValid) {
        updateScore(10);
        onCorrectGuess();
        setInput('');
        setError('');
      } else {
        setError(result.reason || 'Your explanation was not accurate. Please try again.');
      }
    } catch (err) {
      setError('Failed to verify your answer. Please try again.');
    } finally {
      setIsVerifying(false);
    }
  };

  return (
    <div className="space-y-4">
      <div>
        <textarea
          value={input}
          onChange={handleInputChange}
          disabled={isVerifying}
          className="w-full h-32 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 disabled:bg-gray-100"
          placeholder="Explain the word without using any taboo words..."
        />
        {error && (
          <p className="mt-2 text-sm text-red-600">{error}</p>
        )}
      </div>
      <Button 
        onClick={handleSubmit} 
        className="w-full"
        disabled={isVerifying || input.trim().length < 10}
      >
        {isVerifying ? 'Verifying...' : 'Submit Explanation'}
      </Button>
    </div>
  );
}