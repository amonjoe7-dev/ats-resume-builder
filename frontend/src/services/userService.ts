import { User } from '@types/index'
import { apiClient } from '@utils/api'

class UserService {
  async getProfile() {
    const response = await apiClient.get<User>('/users/profile')
    return response.data
  }

  async updateProfile(user: Partial<User>) {
    const response = await apiClient.put<User>('/users/profile', user)
    return response.data
  }

  async uploadAvatar(file: File) {
    const formData = new FormData()
    formData.append('avatar', file)
    const response = await apiClient.post<{ url: string }>('/users/avatar', formData)
    return response.data
  }

  async changePassword(oldPassword: string, newPassword: string) {
    const response = await apiClient.post('/users/change-password', {
      oldPassword,
      newPassword,
    })
    return response.success
  }
}

export const userService = new UserService()
