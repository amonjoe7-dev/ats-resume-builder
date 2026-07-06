import { create } from 'zustand'
import { JobApplication } from '@types/index'
import { apiClient } from '@utils/api'

interface JobTrackerStore {
  applications: JobApplication[]
  currentApplication: JobApplication | null
  isLoading: boolean
  error: string | null

  fetchApplications: () => Promise<void>
  fetchApplicationById: (id: string) => Promise<void>
  createApplication: (app: Omit<JobApplication, 'id' | 'createdAt' | 'updatedAt'>) => Promise<void>
  updateApplication: (id: string, app: Partial<JobApplication>) => Promise<void>
  deleteApplication: (id: string) => Promise<void>
  clearError: () => void
}

export const useJobTrackerStore = create<JobTrackerStore>((set, get) => ({
  applications: [],
  currentApplication: null,
  isLoading: false,
  error: null,

  fetchApplications: async () => {
    set({ isLoading: true, error: null })
    try {
      const response = await apiClient.get<JobApplication[]>('/job-applications')
      if (response.success && response.data) {
        set({ applications: response.data })
      } else {
        set({ error: response.error || 'Failed to fetch applications' })
      }
    } catch (err) {
      const message = err instanceof Error ? err.message : 'An error occurred'
      set({ error: message })
    } finally {
      set({ isLoading: false })
    }
  },

  fetchApplicationById: async (id: string) => {
    set({ isLoading: true, error: null })
    try {
      const response = await apiClient.get<JobApplication>(`/job-applications/${id}`)
      if (response.success && response.data) {
        set({ currentApplication: response.data })
      } else {
        set({ error: response.error || 'Failed to fetch application' })
      }
    } catch (err) {
      const message = err instanceof Error ? err.message : 'An error occurred'
      set({ error: message })
    } finally {
      set({ isLoading: false })
    }
  },

  createApplication: async (app) => {
    set({ isLoading: true, error: null })
    try {
      const response = await apiClient.post<JobApplication>('/job-applications', app)
      if (response.success && response.data) {
        const { applications } = get()
        set({ applications: [...applications, response.data] })
      } else {
        set({ error: response.error || 'Failed to create application' })
      }
    } catch (err) {
      const message = err instanceof Error ? err.message : 'An error occurred'
      set({ error: message })
    } finally {
      set({ isLoading: false })
    }
  },

  updateApplication: async (id, app) => {
    set({ isLoading: true, error: null })
    try {
      const response = await apiClient.put<JobApplication>(`/job-applications/${id}`, app)
      if (response.success && response.data) {
        const { applications, currentApplication } = get()
        set({
          applications: applications.map(a => a.id === id ? response.data : a),
          currentApplication: currentApplication?.id === id ? response.data : currentApplication,
        })
      } else {
        set({ error: response.error || 'Failed to update application' })
      }
    } catch (err) {
      const message = err instanceof Error ? err.message : 'An error occurred'
      set({ error: message })
    } finally {
      set({ isLoading: false })
    }
  },

  deleteApplication: async (id) => {
    set({ isLoading: true, error: null })
    try {
      const response = await apiClient.delete(`/job-applications/${id}`)
      if (response.success) {
        const { applications } = get()
        set({ applications: applications.filter(a => a.id !== id) })
      } else {
        set({ error: response.error || 'Failed to delete application' })
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
