import { create } from 'zustand';

interface ExpenseState {
  // Only client-side state
  selectedFriend: string | null;
  setSelectedFriend: (id: string | null) => void;
}

export const useExpenseStore = create<ExpenseState>((set) => ({
  selectedFriend: null,
  setSelectedFriend: (id) => set({ selectedFriend: id }),
}));