import { create } from "zustand";
import { persist } from "zustand/middleware";
import { type Appointment, type BusinessOwner, type Customer, mockBusinessOwners, mockCustomers } from "../mock-data";
import { createSelectors } from "./utils";

interface AppState {
    // Data
    appointments: Appointment[];
    businesses: BusinessOwner[];
    customers: Customer[];

    // Actions
    addAppointment: (appointment: Omit<Appointment, "id">) => void;
    updateAppointment: (id: string, updates: Partial<Appointment>) => void;
    deleteAppointment: (id: string) => void;
    getBusinessAppointments: (businessId: string) => Appointment[];
    getCustomerAppointments: (customerId: string) => Appointment[];
    getBusinessById: (id: string) => BusinessOwner | undefined;
    getCustomerById: (id: string) => Customer | undefined;
}

export const useAppStoreBase = create<AppState>()(
    persist(
        (set, get) => ({
            // Initial state
            appointments: [],
            businesses: mockBusinessOwners,
            customers: mockCustomers,

            // Appointment actions
            addAppointment: (appointmentData) => {
                const newAppointment: Appointment = {
                    ...appointmentData,
                    id: `appointment-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
                };

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
                return get().appointments.filter((apt) => apt.businessId === businessId);
            },

            getCustomerAppointments: (customerId) => {
                return get().appointments.filter((apt) => apt.customerId === customerId);
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
