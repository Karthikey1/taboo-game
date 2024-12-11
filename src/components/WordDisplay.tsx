import { GameWord } from '../types/game';

interface WordDisplayProps {
  word: GameWord;
}

export function WordDisplay({ word }: WordDisplayProps) {
  return (
    <div className="space-y-6">
      <div className="bg-blue-50 p-6 rounded-lg">
        <h3 className="text-sm font-medium text-blue-800 mb-2">Guess Word</h3>
        <p className="text-3xl font-bold text-blue-900">{word.word}</p>
      </div>
      
      <div className="bg-red-50 p-6 rounded-lg">
        <h3 className="text-sm font-medium text-red-800 mb-2">Taboo Words</h3>
        <div className="flex flex-wrap gap-2">
          {word.tabooWords.map((tabooWord) => (
            <span
              key={tabooWord}
              className="px-3 py-1 bg-red-100 text-red-800 rounded-full text-sm"
            >
              {tabooWord}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}