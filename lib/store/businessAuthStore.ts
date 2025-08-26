import { create } from "zustand";
import { persist } from "zustand/middleware";
import { type BusinessOwner, mockBusinessOwners } from "../mock-data";
import { createSelectors } from "./utils";

interface BusinessAuthState {
  user: BusinessOwner | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<{ success: boolean; error?: string }>;
  logout: () => void;
}

export const useBusinessAuthStoreBase = create<BusinessAuthState>()(
  persist(
    (set) => ({
      user: null,
      isAuthenticated: false,

      login: async (email: string, password: string) => {
        const foundUser = mockBusinessOwners.find((u) => u.email === email && u.password === password);
        if (foundUser) {
          set({ user: foundUser, isAuthenticated: true });
          return { success: true };
        }
        return { success: false, error: "כתובת מייל או סיסמה שגויים" };
      },

      logout: () => {
        set({ user: null, isAuthenticated: false });
      },
    }),
    {
      name: "keepqueue-business-auth",
      partialize: (state) => ({ user: state.user, isAuthenticated: state.isAuthenticated }),
    }
  )
);

export const useBusinessAuthStore = createSelectors<BusinessAuthState>(useBusinessAuthStoreBase);


