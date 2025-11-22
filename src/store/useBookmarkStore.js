import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export const useBookmarkStore = create(
  persist(
    (set) => ({
      bookmarks: [],
      addBookmark: (question) => set((state) => ({ bookmarks: [...state.bookmarks, question] })),
      deleteBookmark: (questionId) =>
        set((state) => {
          const newBookmarks = state.bookmarks.filter((bookmark) => bookmark.id !== questionId);

          return { bookmarks: newBookmarks };
        }),
    }),
    {
      name: 'bookmarks',
    }
  )
);
