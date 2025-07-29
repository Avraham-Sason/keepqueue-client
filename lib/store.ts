import { create } from "zustand"
import { persist } from "zustand/middleware"
import {
  type User,
  type Appointment,
  type BusinessOwner,
  type Customer,
  mockBusinessOwners,
  mockCustomers,
} from "./mock-data"

interface AppState {
  // Authentication
  user: User | null
  isAuthenticated: boolean

  // Data
  appointments: Appointment[]
  businesses: BusinessOwner[]
  customers: Customer[]

  // Actions
  login: (email: string, password: string) => Promise<{ success: boolean; error?: string }>
  logout: () => void
  addAppointment: (appointment: Omit<Appointment, "id">) => void
  updateAppointment: (id: string, updates: Partial<Appointment>) => void
  deleteAppointment: (id: string) => void
  getBusinessAppointments: (businessId: string) => Appointment[]
  getCustomerAppointments: (customerId: string) => Appointment[]
  getBusinessById: (id: string) => BusinessOwner | undefined
  getCustomerById: (id: string) => Customer | undefined
}

const allUsers = [...mockBusinessOwners, ...mockCustomers]

export const useAppStore = create<AppState>()(
  persist(
    (set, get) => ({
      // Initial state
      user: null,
      isAuthenticated: false,
      appointments: [],
      businesses: mockBusinessOwners,
      customers: mockCustomers,

      // Authentication actions
      login: async (email: string, password: string) => {
        const foundUser = allUsers.find((u) => u.email === email && u.password === password)

        if (foundUser) {
          set({ user: foundUser, isAuthenticated: true })
          return { success: true }
        } else {
          return { success: false, error: "כתובת מייל או סיסמה שגויים" }
        }
      },

      logout: () => {
        set({ user: null, isAuthenticated: false })
      },

      // Appointment actions
      addAppointment: (appointmentData) => {
        const newAppointment: Appointment = {
          ...appointmentData,
          id: `appointment-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
        }

        set((state) => ({
          appointments: [...state.appointments, newAppointment],
        }))
      },

      updateAppointment: (id, updates) => {
        set((state) => ({
          appointments: state.appointments.map((apt) => (apt.id === id ? { ...apt, ...updates } : apt)),
        }))
      },

      deleteAppointment: (id) => {
        set((state) => ({
          appointments: state.appointments.filter((apt) => apt.id !== id),
        }))
      },

      // Getters
      getBusinessAppointments: (businessId) => {
        return get().appointments.filter((apt) => apt.businessId === businessId)
      },

      getCustomerAppointments: (customerId) => {
        return get().appointments.filter((apt) => apt.customerId === customerId)
      },

      getBusinessById: (id) => {
        return get().businesses.find((business) => business.id === id)
      },

      getCustomerById: (id) => {
        return get().customers.find((customer) => customer.id === id)
      },
    }),
    {
      name: "keepqueue-storage",
      partialize: (state) => ({
        user: state.user,
        isAuthenticated: state.isAuthenticated,
        appointments: state.appointments,
      }),
    },
  ),
)
