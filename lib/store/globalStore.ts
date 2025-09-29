import { create } from "zustand";
import { persist } from "zustand/middleware";
import { type CalendarEvent, type Business, type Customer, type ID } from "../types";
import { createSelectors } from "./utils";

interface AppState {
    // Data
    calendarEvents: CalendarEvent[];
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
            calendarEvents: [],
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
                    calendarEvents: [...state.calendarEvents, newAppointment],
                }));
            },

            updateAppointment: (id, updates) => {
                set((state) => ({
                    calendarEvents: state.calendarEvents.map((apt) => (apt.id === id ? { ...apt, ...updates } : apt)),
                }));
            },

            deleteAppointment: (id) => {
                set((state) => ({
                    calendarEvents: state.calendarEvents.filter((apt) => apt.id !== id),
                }));
            },

            // Getters
            getBusinessAppointments: (businessId) => {
                return get().calendarEvents.filter((apt) => apt.businessId === businessId);
            },

            getCustomerAppointments: (customerId) => {
                return get().calendarEvents.filter((apt) => apt.userId === customerId);
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
                appointments: state.calendarEvents,
            }),
        }
    )
);

export const useAppStore = createSelectors<AppState>(useAppStoreBase);
