// User & Auth Types
export interface User {
  id: string
  email: string
  firstName: string
  lastName: string
  avatar?: string
  createdAt: Date
  updatedAt: Date
}

export interface AuthResponse {
  token: string
  refreshToken: string
  user: User
}

export interface LoginCredentials {
  email: string
  password: string
}

export interface SignupCredentials {
  email: string
  firstName: string
  lastName: string
  password: string
  confirmPassword: string
}

// Resume Types
export interface PersonalInfo {
  firstName: string
  lastName: string
  email: string
  phone: string
  location?: string
  website?: string
  linkedin?: string
  github?: string
  summary?: string
}

export interface Experience {
  id: string
  jobTitle: string
  company: string
  location?: string
  startDate: Date
  endDate?: Date
  currentlyWorking: boolean
  description: string
}

export interface Education {
  id: string
  school: string
  degree: string
  field: string
  startDate: Date
  endDate?: Date
  description?: string
}

export interface Skill {
  id: string
  name: string
  level: 'beginner' | 'intermediate' | 'advanced' | 'expert'
}

export interface Project {
  id: string
  name: string
  description: string
  url?: string
  technologies: string[]
  startDate: Date
  endDate?: Date
}

export interface Language {
  id: string
  name: string
  proficiency: 'elementary' | 'limited' | 'professional' | 'fluent' | 'native'
}

export interface Certificate {
  id: string
  name: string
  issuer: string
  issueDate: Date
  expiryDate?: Date
  credentialUrl?: string
}

export interface Resume {
  id: string
  userId: string
  title: string
  description?: string
  template: 'modern' | 'classic' | 'minimal' | 'creative'
  theme: string
  personalInfo: PersonalInfo
  experience: Experience[]
  education: Education[]
  skills: Skill[]
  projects?: Project[]
  languages?: Language[]
  certificates?: Certificate[]
  atsScore?: number
  createdAt: Date
  updatedAt: Date
}

export interface CoverLetter {
  id: string
  userId: string
  title: string
  content: string
  template: string
  createdAt: Date
  updatedAt: Date
}

export interface JobApplication {
  id: string
  userId: string
  jobTitle: string
  company: string
  status: 'applied' | 'reviewing' | 'interview' | 'rejected' | 'accepted'
  appliedDate: Date
  resumeUsed: string
  coverLetterUsed?: string
  notes?: string
  createdAt: Date
  updatedAt: Date
}

// AI Types
export interface AIRequest {
  content: string
  context: string
  type: 'improve' | 'generate' | 'suggest'
}

export interface AIResponse {
  content: string
  suggestions: string[]
}

// API Response Types
export interface ApiResponse<T> {
  success: boolean
  data?: T
  error?: string
  message?: string
}

export interface PaginatedResponse<T> {
  success: boolean
  data: T[]
  pagination: {
    total: number
    page: number
    pageSize: number
    totalPages: number
  }
}
