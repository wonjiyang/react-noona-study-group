import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export const useQuestionStore = create(
  persist(
    (set) => ({
      questions: [],
      addQuestions: (newQuestions) =>
        set((state) => {
          const existingIds = new Set(state.questions.map((question) => question.id));

          const uniqueNewQuestions = newQuestions.filter((newQuestion) => !existingIds.has(newQuestion.id));

          if (uniqueNewQuestions.length > 0) {
            return { questions: [...state.questions, ...uniqueNewQuestions] };
          }

          return state;
        }),
    }),
    {
      name: 'question-storage',
    }
  )
);
