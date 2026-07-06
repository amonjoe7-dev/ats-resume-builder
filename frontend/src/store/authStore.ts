import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { User, AuthResponse, LoginCredentials, SignupCredentials } from '@types/index'
import { apiClient } from '@utils/api'
import { storage } from '@utils/storage'

interface AuthStore {
  user: User | null
  token: string | null
  refreshToken: string | null
  isLoading: boolean
  error: string | null
  isAuthenticated: boolean

  login: (credentials: LoginCredentials) => Promise<void>
  signup: (credentials: SignupCredentials) => Promise<void>
  logout: () => void
  clearError: () => void
  setUser: (user: User | null) => void
}

export const useAuthStore = create<AuthStore>(
  persist(
    (set) => ({
      user: null,
      token: null,
      refreshToken: null,
      isLoading: false,
      error: null,
      isAuthenticated: false,

      login: async (credentials: LoginCredentials) => {
        set({ isLoading: true, error: null })
        try {
          const response = await apiClient.post<AuthResponse>('/auth/login', credentials)
          if (response.success && response.data) {
            const { token, refreshToken, user } = response.data
            set({
              token,
              refreshToken,
              user,
              isAuthenticated: true,
            })
          } else {
            set({ error: response.error || 'Login failed' })
          }
        } catch (err) {
          const message = err instanceof Error ? err.message : 'An error occurred'
          set({ error: message })
        } finally {
          set({ isLoading: false })
        }
      },

      signup: async (credentials: SignupCredentials) => {
        set({ isLoading: true, error: null })
        try {
          const response = await apiClient.post<AuthResponse>('/auth/signup', credentials)
          if (response.success && response.data) {
            const { token, refreshToken, user } = response.data
            set({
              token,
              refreshToken,
              user,
              isAuthenticated: true,
            })
          } else {
            set({ error: response.error || 'Signup failed' })
          }
        } catch (err) {
          const message = err instanceof Error ? err.message : 'An error occurred'
          set({ error: message })
        } finally {
          set({ isLoading: false })
        }
      },

      logout: () => {
        set({
          user: null,
          token: null,
          refreshToken: null,
          isAuthenticated: false,
          error: null,
        })
      },

      clearError: () => {
        set({ error: null })
      },

      setUser: (user: User | null) => {
        set({ user })
      },
    }),
    {
      name: 'auth-storage',
      storage: {
        getItem: (key: string) => {
          return storage.getItem(key) as AuthStore | null
        },
        setItem: (key: string, value: AuthStore) => {
          storage.setItem(key, value)
        },
        removeItem: (key: string) => {
          storage.removeItem(key)
        },
      },
    }
  )
)
