import { create } from 'zustand';
import { GameState, Player, GameWord } from '../types/game';

const INITIAL_STATE: GameState = {
  player: null,
  currentWord: null,
  isPlaying: false,
  score: 0,
  timeSpent: 0,
  rankings: [],
};

export const useGameStore = create<GameState & {
  setPlayer: (player: Player) => void;
  startGame: () => void;
  endGame: () => void;
  updateScore: (points: number) => void;
  updateTime: (time: number) => void;
  setCurrentWord: (word: GameWord) => void;
}>((set) => ({
  ...INITIAL_STATE,
  setPlayer: (player) => set({ player }),
  startGame: () => set({ isPlaying: true }),
  endGame: () => set((state) => ({
    isPlaying: false,
    rankings: [
      ...state.rankings,
      state.player as Player,
    ].sort((a, b) => b.score - a.score),
  })),
  updateScore: (points) => set((state) => ({ score: state.score + points })),
  updateTime: (time) => set({ timeSpent: time }),
  setCurrentWord: (word) => set({ currentWord: word }),
}));