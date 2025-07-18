import { create } from "zustand";
import { persist } from "zustand/middleware";

interface User {
  id: string;
  email: string;
  name: string;
}

interface AuthStore {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;

  login: (user: User, token: string) => void;
  logout: () => void;
}

export const useAuth = create<AuthStore>()(
  persist(
    (set) => ({
      user: null,
      token: null,
      isAuthenticated: false,
      login: (user, token) => {
        localStorage.setItem("nodewave-token", token);
        set({ user, token, isAuthenticated: true });
      },
      logout: () => {
        localStorage.removeItem("nodewave-token");
        set({ user: null, token: null, isAuthenticated: false });
      },
    }),
    {
      name: "nodewave-token",
    }
  )
);
