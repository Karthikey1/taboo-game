import { useState, useEffect } from 'react';
import { useGameStore } from '../store/gameStore';
import { Button } from './Button';
import { Timer } from './Timer';
import { WordDisplay } from './WordDisplay';
import { UserInput } from './UserInput';
import { Clock, Trophy } from 'lucide-react';

export function GameInterface() {
  const [timeLeft, setTimeLeft] = useState(60);
  const { player, score, endGame } = useGameStore();
  const [currentWordIndex, setCurrentWordIndex] = useState(0);

  const gameWords = [
    { word: 'Computer', tabooWords: ['screen', 'keyboard', 'mouse', 'machine', 'device'] },
    { word: 'Beach', tabooWords: ['sand', 'ocean', 'waves', 'sun', 'swim'] },
    { word: 'Pizza', tabooWords: ['cheese', 'dough', 'tomato', 'slice', 'toppings'] },
  ];

  useEffect(() => {
    if (timeLeft === 0) {
      endGame();
    }
  }, [timeLeft, endGame]);

  return (
    <div className="w-full max-w-4xl p-6 bg-white rounded-xl shadow-lg">
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center space-x-2">
          <Clock className="w-5 h-5 text-blue-600" />
          <Timer timeLeft={timeLeft} setTimeLeft={setTimeLeft} />
        </div>
        <div className="flex items-center space-x-2">
          <Trophy className="w-5 h-5 text-yellow-500" />
          <span className="font-bold">Score: {score}</span>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <WordDisplay word={gameWords[currentWordIndex]} />
        <UserInput 
          targetWord={gameWords[currentWordIndex].word}
          onCorrectGuess={() => {
            if (currentWordIndex < gameWords.length - 1) {
              setCurrentWordIndex(prev => prev + 1);
            } else {
              endGame();
            }
          }}
          tabooWords={gameWords[currentWordIndex].tabooWords}
        />
      </div>
    </div>
  );
}