import { create } from 'zustand'
import { persist } from 'zustand/middleware'

type AuthState = {
  user: null | { id: string; name: string }
  login: (user: { id: string; name: string }) => void
  logout: () => void
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      login: (user) => set({ user }),
      logout: () => set({ user: null }),
    }),
    { name: 'auth-storage' } // persists to localStorage
  )
)
