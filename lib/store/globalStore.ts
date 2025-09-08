import { create } from "zustand";
import { persist } from "zustand/middleware";
import { type CalendarEvent, type Business, type Customer, type ID } from "../types";
import { createSelectors } from "./utils";

interface AppState {
    // Data
    appointments: CalendarEvent[];
    businesses: Business[];
    customers: Customer[];

    // Actions
    addAppointment: (appointment: Omit<CalendarEvent, "id" | "created" | "timestamp">) => void;
    updateAppointment: (id: ID, updates: Partial<CalendarEvent>) => void;
    deleteAppointment: (id: ID) => void;
    getBusinessAppointments: (businessId: ID) => CalendarEvent[];
    getCustomerAppointments: (customerId: ID) => CalendarEvent[];
    getBusinessById: (id: ID) => Business | undefined;
    getCustomerById: (id: ID) => Customer | undefined;
}

export const useAppStoreBase = create<AppState>()(
    persist(
        (set, get) => ({
            // Initial state
            appointments: [],
            businesses: [],
            customers: [],

            // Appointment actions
            addAppointment: (appointmentData) => {
                const newAppointment: CalendarEvent = {
                    ...appointmentData,
                    id: `appointment-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
                    // placeholders for required fields; real creation should come from backend
                    created: (undefined as unknown) as any,
                    timestamp: (undefined as unknown) as any,
                } as CalendarEvent;

                set((state) => ({
                    appointments: [...state.appointments, newAppointment],
                }));
            },

            updateAppointment: (id, updates) => {
                set((state) => ({
                    appointments: state.appointments.map((apt) => (apt.id === id ? { ...apt, ...updates } : apt)),
                }));
            },

            deleteAppointment: (id) => {
                set((state) => ({
                    appointments: state.appointments.filter((apt) => apt.id !== id),
                }));
            },

            // Getters
            getBusinessAppointments: (businessId) => {
                return get().appointments.filter((apt) => apt.business === businessId);
            },

            getCustomerAppointments: (customerId) => {
                return get().appointments.filter((apt) => apt.user === customerId);
            },

            getBusinessById: (id) => {
                return get().businesses.find((business) => business.id === id);
            },

            getCustomerById: (id) => {
                return get().customers.find((customer) => customer.id === id);
            },
        }),
        {
            name: "keepqueue-storage",
            partialize: (state) => ({
                appointments: state.appointments,
            }),
        }
    )
);

export const useAppStore = createSelectors<AppState>(useAppStoreBase);
