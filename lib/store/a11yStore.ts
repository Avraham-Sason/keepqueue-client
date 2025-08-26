import { create } from "zustand";
import { persist } from "zustand/middleware";
import { createSelectors } from "./utils";

interface A11yState {
    a11yEnabled: boolean;
    toggleA11y: () => void;
    setA11y: (enabled: boolean) => void;
}

export const useA11yStoreBase = create<A11yState>()(
    persist(
        (set, get) => ({
            a11yEnabled: false,
            toggleA11y: () => set({ a11yEnabled: !get().a11yEnabled }),
            setA11y: (enabled) => set({ a11yEnabled: enabled }),
        }),
        {
            name: "a11y-preferences",
        }
    )
);

export const useA11yStore = createSelectors<A11yState>(useA11yStoreBase);
