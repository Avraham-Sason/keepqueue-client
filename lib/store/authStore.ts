import { create } from "zustand";
import { persist } from "zustand/middleware";
import { Business, BusinessWithRelations, type User } from "../types";
import { createSelectors } from "./utils";
import { signInWithEmailAndPassword, signOut } from "firebase/auth";
import { auth } from "../firebase/connect";
import { getAllDocuments, queryDocument } from "../firebase";
import { useBusinessesStoreBase } from "./businesses";
import { getBusinessByOwnerId } from "@/app/business/helpers";

interface AuthState {
    user: User | null;
    isAuthenticated: boolean;
    isBusinessOwner: boolean;
    login: (email: string, password: string, type: "business" | "customer") => Promise<{ success: boolean; error?: string }>;
    logout: () => Promise<void>;
}

export const useAuthStoreBase = create<AuthState>()(
    persist(
        (set) => ({
            user: null,
            isAuthenticated: false,
            isBusinessOwner: false,

            login: async (email: string, password: string, type: "business" | "customer") => {
                try {
                    const credential = await signInWithEmailAndPassword(auth, email, password);
                    const firebaseUser = credential.user;
                    const foundUser = await queryDocument("users", "email", "==", email);
                    if (!foundUser || type != foundUser?.type) {
                        await signOut(auth);
                        return { success: false, error: "authErrorTypeMismatch" };
                    }
                    set({ user: foundUser as User, isAuthenticated: true });
                    if (type === "business") {
                        set({ isBusinessOwner: true });
                    } else {
                        set({ isBusinessOwner: false });
                    }
                    return { success: true };
                } catch (error: any) {
                    const isInvalidCredentials = ["auth/invalid-credential", "auth/invalid-email", "auth/wrong-password"].includes(error?.code);
                    const error_key = isInvalidCredentials ? "authErrorInvalidCredentials" : "authErrorGeneric";
                    return { success: false, error: error_key };
                }
            },

            logout: async () => {
                try {
                    await signOut(auth);
                } finally {
                    useBusinessesStoreBase.setState({ currentBusiness: null });
                    set({ user: null, isAuthenticated: false, isBusinessOwner: false });
                }
            },
        }),
        {
            name: "AuthStore",
            partialize: (state) => ({ user: state.user, isAuthenticated: state.isAuthenticated }),
        }
    )
);

export const useAuthStore = createSelectors<AuthState>(useAuthStoreBase);
