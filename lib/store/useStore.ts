import { create } from "zustand";
import { User } from "../db/schema";

interface UserState {
  user: User | null;
  setUser: (user: User | null) => void;
}

export const userStore = create<UserState>((set) => ({
  user: null,
  setUser: (user) => set({ user }),
}));
