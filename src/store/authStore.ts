import { create } from 'zustand'

export type UserRole = 'candidate' | 'recruiter' | 'hiring_manager' | 'org_admin' | 'platform_admin'

interface User {
  id: string
  email: string
  role: UserRole
  name?: string
  avatar_url?: string
}

interface AuthState {
  user: User | null
  session: any | null // Supabase Session type
  isLoading: boolean
  setUser: (user: User | null) => void
  setSession: (session: any | null) => void
  setIsLoading: (isLoading: boolean) => void
  logout: () => void
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  session: null,
  isLoading: true,
  setUser: (user) => set({ user }),
  setSession: (session) => set({ session }),
  setIsLoading: (isLoading) => set({ isLoading }),
  logout: () => set({ user: null, session: null }),
}))
