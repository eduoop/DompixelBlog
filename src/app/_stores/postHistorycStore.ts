import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import { Post } from "../_services/http/posts";

interface PostHistoryStoreState {
  posts: Post[];
  addPost: (post: Post) => void;
  removePost: (id: string) => void;
  clearHistory: () => void;
}

export const usePostHistoryStore = create(
  persist<PostHistoryStoreState>(
    (set) => ({
      posts: [],
      addPost: (newPost: Post) => {
        set((state) => {
          const postExists = state.posts.find((post) => post.id === newPost.id);

          const updatedPosts = postExists
            ? state.posts.filter((post) => post.id !== newPost.id)
            : state.posts;

          return {
            posts: [newPost, ...updatedPosts],
          };
        });
      },
      removePost: (id: string) => {
        set((state) => ({
          posts: state.posts.filter((post) => post.id !== id),
        }));
      },
      clearHistory: () => set({ posts: [] }),
    }),
    {
      name: "post-history-storage",
      storage: createJSONStorage(() => localStorage),
    }
  )
);

