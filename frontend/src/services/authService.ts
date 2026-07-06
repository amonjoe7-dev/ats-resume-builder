import { LoginCredentials, SignupCredentials, AuthResponse } from '@types/index'
import { apiClient } from '@utils/api'

class AuthService {
  async login(credentials: LoginCredentials) {
    const response = await apiClient.post<AuthResponse>('/auth/login', credentials)
    return response.data
  }

  async signup(credentials: SignupCredentials) {
    const response = await apiClient.post<AuthResponse>('/auth/signup', credentials)
    return response.data
  }

  async logout() {
    const response = await apiClient.post('/auth/logout', {})
    return response.success
  }

  async forgotPassword(email: string) {
    const response = await apiClient.post('/auth/forgot-password', { email })
    return response.success
  }

  async resetPassword(token: string, password: string) {
    const response = await apiClient.post('/auth/reset-password', { token, password })
    return response.success
  }

  async refreshToken(refreshToken: string) {
    const response = await apiClient.post<AuthResponse>('/auth/refresh', { refreshToken })
    return response.data
  }
}

export const authService = new AuthService()
