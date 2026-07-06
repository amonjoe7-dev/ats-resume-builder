import { useNavigate } from 'react-router-dom'
import { useAuthStore } from '@stores/authStore'

export function useAuth() {
  const navigate = useNavigate()
  const { user, token, isAuthenticated, login, signup, logout } = useAuthStore()

  const handleLogout = () => {
    logout()
    navigate('/login')
  }

  return {
    user,
    token,
    isAuthenticated,
    login,
    signup,
    logout: handleLogout,
  }
}
