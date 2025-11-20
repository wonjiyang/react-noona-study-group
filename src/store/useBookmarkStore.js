import { create } from 'zustand';

export const useBookmarkStore = create((set) => ({
  bookmarks: [],
  addBookmark: (question) => set((state) => ({ bookmarks: [...state.bookmarks, question] })),
  deleteBookmark: (questionId) =>
    set((state) => {
      const newBookmarks = state.bookmarks.filter((bookmark) => bookmark.id !== questionId);

      return { bookmarks: newBookmarks };
    }),
}));
