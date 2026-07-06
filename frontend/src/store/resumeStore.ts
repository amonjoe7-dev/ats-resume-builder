import { create } from 'zustand'
import { Resume } from '@types/index'
import { apiClient } from '@utils/api'

interface ResumeStore {
  resumes: Resume[]
  currentResume: Resume | null
  isLoading: boolean
  error: string | null

  fetchResumes: () => Promise<void>
  fetchResumeById: (id: string) => Promise<void>
  createResume: (resume: Omit<Resume, 'id' | 'createdAt' | 'updatedAt'>) => Promise<void>
  updateResume: (id: string, resume: Partial<Resume>) => Promise<void>
  deleteResume: (id: string) => Promise<void>
  clearError: () => void
}

export const useResumeStore = create<ResumeStore>((set, get) => ({
  resumes: [],
  currentResume: null,
  isLoading: false,
  error: null,

  fetchResumes: async () => {
    set({ isLoading: true, error: null })
    try {
      const response = await apiClient.get<Resume[]>('/resumes')
      if (response.success && response.data) {
        set({ resumes: response.data })
      } else {
        set({ error: response.error || 'Failed to fetch resumes' })
      }
    } catch (err) {
      const message = err instanceof Error ? err.message : 'An error occurred'
      set({ error: message })
    } finally {
      set({ isLoading: false })
    }
  },

  fetchResumeById: async (id: string) => {
    set({ isLoading: true, error: null })
    try {
      const response = await apiClient.get<Resume>(`/resumes/${id}`)
      if (response.success && response.data) {
        set({ currentResume: response.data })
      } else {
        set({ error: response.error || 'Failed to fetch resume' })
      }
    } catch (err) {
      const message = err instanceof Error ? err.message : 'An error occurred'
      set({ error: message })
    } finally {
      set({ isLoading: false })
    }
  },

  createResume: async (resume) => {
    set({ isLoading: true, error: null })
    try {
      const response = await apiClient.post<Resume>('/resumes', resume)
      if (response.success && response.data) {
        const { resumes } = get()
        set({ resumes: [...resumes, response.data] })
      } else {
        set({ error: response.error || 'Failed to create resume' })
      }
    } catch (err) {
      const message = err instanceof Error ? err.message : 'An error occurred'
      set({ error: message })
    } finally {
      set({ isLoading: false })
    }
  },

  updateResume: async (id, resume) => {
    set({ isLoading: true, error: null })
    try {
      const response = await apiClient.put<Resume>(`/resumes/${id}`, resume)
      if (response.success && response.data) {
        const { resumes, currentResume } = get()
        set({
          resumes: resumes.map(r => r.id === id ? response.data : r),
          currentResume: currentResume?.id === id ? response.data : currentResume,
        })
      } else {
        set({ error: response.error || 'Failed to update resume' })
      }
    } catch (err) {
      const message = err instanceof Error ? err.message : 'An error occurred'
      set({ error: message })
    } finally {
      set({ isLoading: false })
    }
  },

  deleteResume: async (id) => {
    set({ isLoading: true, error: null })
    try {
      const response = await apiClient.delete(`/resumes/${id}`)
      if (response.success) {
        const { resumes } = get()
        set({ resumes: resumes.filter(r => r.id !== id) })
      } else {
        set({ error: response.error || 'Failed to delete resume' })
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
