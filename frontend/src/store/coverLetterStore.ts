import { create } from 'zustand'
import { CoverLetter } from '@types/index'
import { apiClient } from '@utils/api'

interface CoverLetterStore {
  coverLetters: CoverLetter[]
  currentCoverLetter: CoverLetter | null
  isLoading: boolean
  error: string | null

  fetchCoverLetters: () => Promise<void>
  fetchCoverLetterById: (id: string) => Promise<void>
  createCoverLetter: (letter: Omit<CoverLetter, 'id' | 'createdAt' | 'updatedAt'>) => Promise<void>
  updateCoverLetter: (id: string, letter: Partial<CoverLetter>) => Promise<void>
  deleteCoverLetter: (id: string) => Promise<void>
  clearError: () => void
}

export const useCoverLetterStore = create<CoverLetterStore>((set, get) => ({
  coverLetters: [],
  currentCoverLetter: null,
  isLoading: false,
  error: null,

  fetchCoverLetters: async () => {
    set({ isLoading: true, error: null })
    try {
      const response = await apiClient.get<CoverLetter[]>('/cover-letters')
      if (response.success && response.data) {
        set({ coverLetters: response.data })
      } else {
        set({ error: response.error || 'Failed to fetch cover letters' })
      }
    } catch (err) {
      const message = err instanceof Error ? err.message : 'An error occurred'
      set({ error: message })
    } finally {
      set({ isLoading: false })
    }
  },

  fetchCoverLetterById: async (id: string) => {
    set({ isLoading: true, error: null })
    try {
      const response = await apiClient.get<CoverLetter>(`/cover-letters/${id}`)
      if (response.success && response.data) {
        set({ currentCoverLetter: response.data })
      } else {
        set({ error: response.error || 'Failed to fetch cover letter' })
      }
    } catch (err) {
      const message = err instanceof Error ? err.message : 'An error occurred'
      set({ error: message })
    } finally {
      set({ isLoading: false })
    }
  },

  createCoverLetter: async (letter) => {
    set({ isLoading: true, error: null })
    try {
      const response = await apiClient.post<CoverLetter>('/cover-letters', letter)
      if (response.success && response.data) {
        const { coverLetters } = get()
        set({ coverLetters: [...coverLetters, response.data] })
      } else {
        set({ error: response.error || 'Failed to create cover letter' })
      }
    } catch (err) {
      const message = err instanceof Error ? err.message : 'An error occurred'
      set({ error: message })
    } finally {
      set({ isLoading: false })
    }
  },

  updateCoverLetter: async (id, letter) => {
    set({ isLoading: true, error: null })
    try {
      const response = await apiClient.put<CoverLetter>(`/cover-letters/${id}`, letter)
      if (response.success && response.data) {
        const { coverLetters, currentCoverLetter } = get()
        set({
          coverLetters: coverLetters.map(l => l.id === id ? response.data : l),
          currentCoverLetter: currentCoverLetter?.id === id ? response.data : currentCoverLetter,
        })
      } else {
        set({ error: response.error || 'Failed to update cover letter' })
      }
    } catch (err) {
      const message = err instanceof Error ? err.message : 'An error occurred'
      set({ error: message })
    } finally {
      set({ isLoading: false })
    }
  },

  deleteCoverLetter: async (id) => {
    set({ isLoading: true, error: null })
    try {
      const response = await apiClient.delete(`/cover-letters/${id}`)
      if (response.success) {
        const { coverLetters } = get()
        set({ coverLetters: coverLetters.filter(l => l.id !== id) })
      } else {
        set({ error: response.error || 'Failed to delete cover letter' })
      }
    } catch (err) {
      const message = err instanceof Error ? err.message : 'An error occurred'
      set({ error: message })
    } finally {
      set({ isLoading: false })
    }
  },

  clearError: () => {
    set({ error: null })
  },
}))
