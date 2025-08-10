import { create } from "zustand";
import { persist } from "zustand/middleware";
import { type Customer, mockCustomers } from "../mock-data";
import { createUseSelectors } from "./utils";

interface CustomersAuthState {
  user: Customer | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<{ success: boolean; error?: string }>;
  logout: () => void;
}

export const useCustomersAuthStoreBase = create<CustomersAuthState>()(
  persist(
    (set) => ({
      user: null,
      isAuthenticated: false,

      login: async (email: string, password: string) => {
        const foundUser = mockCustomers.find((u) => u.email === email && u.password === password);
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
      name: "keepqueue-customers-auth",
      partialize: (state) => ({ user: state.user, isAuthenticated: state.isAuthenticated }),
    }
  )
);

export const useCustomersAuthStore = createUseSelectors(useCustomersAuthStoreBase);


