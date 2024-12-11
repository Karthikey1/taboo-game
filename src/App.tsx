import { useGameStore } from './store/gameStore';
import { PlayerForm } from './components/PlayerForm';
import { GameInterface } from './components/GameInterface';

function App() {
  const isPlaying = useGameStore((state) => state.isPlaying);

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      {!isPlaying ? <PlayerForm /> : <GameInterface />}
    </div>
  );
}

export default App;