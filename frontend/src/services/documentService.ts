import { Resume, CoverLetter, JobApplication } from '@types/index'
import { apiClient } from '@utils/api'

class ResumeService {
  async getResumes() {
    const response = await apiClient.get<Resume[]>('/resumes')
    return response.data || []
  }

  async getResume(id: string) {
    const response = await apiClient.get<Resume>(`/resumes/${id}`)
    return response.data
  }

  async createResume(resume: Omit<Resume, 'id' | 'createdAt' | 'updatedAt'>) {
    const response = await apiClient.post<Resume>('/resumes', resume)
    return response.data
  }

  async updateResume(id: string, resume: Partial<Resume>) {
    const response = await apiClient.put<Resume>(`/resumes/${id}`, resume)
    return response.data
  }

  async deleteResume(id: string) {
    const response = await apiClient.delete(`/resumes/${id}`)
    return response.success
  }

  async duplicateResume(id: string) {
    const response = await apiClient.post<Resume>(`/resumes/${id}/duplicate`, {})
    return response.data
  }
}

class CoverLetterService {
  async getCoverLetters() {
    const response = await apiClient.get<CoverLetter[]>('/cover-letters')
    return response.data || []
  }

  async getCoverLetter(id: string) {
    const response = await apiClient.get<CoverLetter>(`/cover-letters/${id}`)
    return response.data
  }

  async createCoverLetter(letter: Omit<CoverLetter, 'id' | 'createdAt' | 'updatedAt'>) {
    const response = await apiClient.post<CoverLetter>('/cover-letters', letter)
    return response.data
  }

  async updateCoverLetter(id: string, letter: Partial<CoverLetter>) {
    const response = await apiClient.put<CoverLetter>(`/cover-letters/${id}`, letter)
    return response.data
  }

  async deleteCoverLetter(id: string) {
    const response = await apiClient.delete(`/cover-letters/${id}`)
    return response.success
  }
}

class JobApplicationService {
  async getApplications() {
    const response = await apiClient.get<JobApplication[]>('/job-applications')
    return response.data || []
  }

  async getApplication(id: string) {
    const response = await apiClient.get<JobApplication>(`/job-applications/${id}`)
    return response.data
  }

  async createApplication(app: Omit<JobApplication, 'id' | 'createdAt' | 'updatedAt'>) {
    const response = await apiClient.post<JobApplication>('/job-applications', app)
    return response.data
  }

  async updateApplication(id: string, app: Partial<JobApplication>) {
    const response = await apiClient.put<JobApplication>(`/job-applications/${id}`, app)
    return response.data
  }

  async deleteApplication(id: string) {
    const response = await apiClient.delete(`/job-applications/${id}`)
    return response.success
  }
}

export const resumeService = new ResumeService()
export const coverLetterService = new CoverLetterService()
export const jobApplicationService = new JobApplicationService()
