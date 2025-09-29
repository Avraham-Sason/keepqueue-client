import { create } from "zustand";
import { Business } from "../types";
import { createSelectors, type SetState, setState } from "./utils";

interface BusinessesState {
    currentBusiness: Business | null;
    setCurrentBusiness: SetState<Business | null>;
}

export const useBusinessesStoreBase = create<BusinessesState>()((set) => ({
    currentBusiness: null,
    setCurrentBusiness: (updater) => setState(updater, set, "currentBusiness"),
}));

export const useBusinessesStore = createSelectors<BusinessesState>(useBusinessesStoreBase);
