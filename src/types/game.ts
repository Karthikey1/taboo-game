export interface Player {
  name: string;
  email: string;
  score: number;
  timeSpent: number;
}

export interface GameWord {
  word: string;
  tabooWords: string[];
}

export interface GameState {
  player: Player | null;
  currentWord: GameWord | null;
  isPlaying: boolean;
  score: number;
  timeSpent: number;
  rankings: Player[];
}