import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export const useQuestionStore = create(
  persist(
    (set) => ({
      questions: [],
      setQuestions: (newQuestions) => set({ questions: newQuestions }),
    }),
    {
      name: 'question-storage',
    }
  )
);
