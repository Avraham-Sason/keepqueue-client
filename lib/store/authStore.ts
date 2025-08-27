import { create } from "zustand";
import { persist } from "zustand/middleware";
import { type User } from "../mock-data";
import { createSelectors } from "./utils";
import { signInWithEmailAndPassword, signOut } from "firebase/auth";
import { auth } from "../firebase/connect";
import { getAllDocuments, queryDocument } from "../firebase";

interface BusinessAuthState {
    user: User | null;
    isAuthenticated: boolean;
    login: (email: string, password: string) => Promise<{ success: boolean; error?: string }>;
    logout: () => Promise<void>;
}

export const useAuthStoreBase = create<BusinessAuthState>()(
    persist(
        (set) => ({
            user: null,
            isAuthenticated: false,

            login: async (email: string, password: string) => {
                try {
                    const credential = await signInWithEmailAndPassword(auth, email, password);
                    const firebaseUser = credential.user;
                    const foundUser = await queryDocument("users", "email", "==", email);
                    if (foundUser) {
                        set({ user: foundUser as User, isAuthenticated: true });
                        return { success: true };
                    }
                    await signOut(auth);
                    return { success: false, error: "המשתמש אינו בעל עסק במערכת" };
                } catch (error: any) {
                    const message =
                        error?.code === "auth/invalid-credential" || error?.code === "auth/invalid-email" || error?.code === "auth/wrong-password"
                            ? "כתובת מייל או סיסמה שגויים"
                            : "שגיאה בהתחברות. נסו שוב.";
                    return { success: false, error: message };
                }
            },

            logout: async () => {
                try {
                    await signOut(auth);
                } finally {
                    set({ user: null, isAuthenticated: false });
                }
            },
        }),
        {
            name: "keepqueue-business-auth",
            partialize: (state) => ({ user: state.user, isAuthenticated: state.isAuthenticated }),
        }
    )
);

export const useAuthStore = createSelectors<BusinessAuthState>(useAuthStoreBase);
