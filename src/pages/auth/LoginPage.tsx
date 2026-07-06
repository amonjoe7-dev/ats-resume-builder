import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { Mail, Lock } from 'lucide-react'
import { useAuth } from '@hooks/useAuth'
import { AuthLayout, Button, Input, Alert } from '@components'
import { validateEmail, validatePassword } from '@utils/validation'

export function LoginPage() {
  const navigate = useNavigate()
  const { login, error, isLoading } = useAuth()
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  })
  const [errors, setErrors] = useState<Record<string, string>>({})

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }))
    }
  }

  const validateForm = () => {
    const newErrors: Record<string, string> = {}

    if (!formData.email) {
      newErrors.email = 'Email is required'
    } else if (!validateEmail(formData.email)) {
      newErrors.email = 'Please enter a valid email'
    }

    if (!formData.password) {
      newErrors.password = 'Password is required'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!validateForm()) return

    try {
      await login({
        email: formData.email,
        password: formData.password,
      })
      navigate('/dashboard')
    } catch (err) {
      console.error('Login error:', err)
    }
  }

  return (
    <AuthLayout>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-secondary-900 mb-2">Welcome Back</h1>
        <p className="text-secondary-600">Sign in to your account to continue</p>
      </div>

      {error && (
        <Alert
          type="error"
          message={error}
          className="mb-6"
        />
      )}

      <form onSubmit={handleSubmit} className="space-y-5">
        <Input
          label="Email Address"
          type="email"
          name="email"
          icon={<Mail size={18} />}
          placeholder="you@example.com"
          value={formData.email}
          onChange={handleChange}
          error={errors.email}
          disabled={isLoading}
        />

        <Input
          label="Password"
          type="password"
          name="password"
          icon={<Lock size={18} />}
          placeholder="Enter your password"
          value={formData.password}
          onChange={handleChange}
          error={errors.password}
          disabled={isLoading}
        />

        <div className="flex items-center justify-between text-sm">
          <Link
            to="/forgot-password"
            className="text-primary-600 hover:text-primary-700 font-medium"
          >
            Forgot password?
          </Link>
        </div>

        <Button
          type="submit"
          variant="primary"
          size="lg"
          className="w-full"
          isLoading={isLoading}
        >
          Sign In
        </Button>
      </form>

      <div className="mt-6 pt-6 border-t border-secondary-200">
        <p className="text-center text-secondary-600 text-sm">
          Don't have an account?{' '}
          <Link
            to="/signup"
            className="text-primary-600 hover:text-primary-700 font-semibold"
          >
            Sign up here
          </Link>
        </p>
      </div>
    </AuthLayout>
  )
}
