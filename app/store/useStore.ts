import { create } from 'zustand';

type User = { name: string; birth: string };
type Store = {
  user: User;
  goal: string;
  setUser: (user: User) => void;
  setGoal: (goal: string) => void;
};

export const useStore = create<Store>(set => ({
  user: { name: '', birth: '' },
  goal: '求财',
  setUser: user => set({ user }),
  setGoal: goal => set({ goal })
}));
