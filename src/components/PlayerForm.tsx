import { FormEvent, useState } from 'react';
import { useGameStore } from '../store/gameStore';
import { Input } from './Input';
import { Button } from './Button';
import { Gamepad2 } from 'lucide-react';

export function PlayerForm() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const setPlayer = useGameStore((state) => state.setPlayer);
  const startGame = useGameStore((state) => state.startGame);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setPlayer({ name, email, score: 0, timeSpent: 0 });
    startGame();
  };

  return (
    <div className="w-full max-w-md p-8 bg-white rounded-xl shadow-lg">
      <div className="flex items-center justify-center mb-8">
        <Gamepad2 className="w-12 h-12 text-blue-600" />
      </div>
      <h2 className="text-2xl font-bold text-center mb-6">Welcome to Taboo!</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <Input
          label="Name"
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          placeholder="Enter your name"
        />
        <Input
          label="Email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          placeholder="Enter your email"
        />
        <Button type="submit" className="w-full">
          Start Game
        </Button>
      </form>
    </div>
  );
}