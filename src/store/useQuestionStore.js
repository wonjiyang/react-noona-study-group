import { create } from 'zustand';
import data from '../../data';

export const useQuestionStore = create(() => ({
  questions: data,
}));
