import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { Mail, Lock, User } from 'lucide-react'
import { useAuth } from '@hooks/useAuth'
import { AuthLayout, Button, Input, Alert } from '@components'
import { validateEmail, validatePassword, validatePasswordMatch } from '@utils/validation'

export function SignupPage() {
  const navigate = useNavigate()
  const { signup, error, isLoading } = useAuth()
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
  })
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [passwordErrors, setPasswordErrors] = useState<string[]>([])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }))
    }

    // Show password requirements as user types
    if (name === 'password' && value) {
      const { errors: pwErrors } = validatePassword(value)
      setPasswordErrors(pwErrors)
    }
  }

  const validateForm = () => {
    const newErrors: Record<string, string> = {}

    if (!formData.firstName) {
      newErrors.firstName = 'First name is required'
    }

    if (!formData.lastName) {
      newErrors.lastName = 'Last name is required'
    }

    if (!formData.email) {
      newErrors.email = 'Email is required'
    } else if (!validateEmail(formData.email)) {
      newErrors.email = 'Please enter a valid email'
    }

    const { isValid: passwordValid, errors: pwErrors } = validatePassword(formData.password)
    if (!passwordValid) {
      newErrors.password = pwErrors[0]
    }

    if (!validatePasswordMatch(formData.password, formData.confirmPassword)) {
      newErrors.confirmPassword = 'Passwords do not match'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!validateForm()) return

    try {
      await signup({
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
        password: formData.password,
        confirmPassword: formData.confirmPassword,
      })
      navigate('/dashboard')
    } catch (err) {
      console.error('Signup error:', err)
    }
  }

  return (
    <AuthLayout>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-secondary-900 mb-2">Create Account</h1>
        <p className="text-secondary-600">Join us to build amazing resumes</p>
      </div>

      {error && (
        <Alert
          type="error"
          message={error}
          className="mb-6"
        />
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-2 gap-3">
          <Input
            label="First Name"
            type="text"
            name="firstName"
            icon={<User size={18} />}
            placeholder="John"
            value={formData.firstName}
            onChange={handleChange}
            error={errors.firstName}
            disabled={isLoading}
          />
          <Input
            label="Last Name"
            type="text"
            name="lastName"
            placeholder="Doe"
            value={formData.lastName}
            onChange={handleChange}
            error={errors.lastName}
            disabled={isLoading}
          />
        </div>

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
          placeholder="Create a strong password"
          value={formData.password}
          onChange={handleChange}
          error={errors.password}
          disabled={isLoading}
        />

        {passwordErrors.length > 0 && formData.password && (
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3">
            <p className="text-sm font-medium text-yellow-800 mb-2">Password requirements:</p>
            <ul className="text-sm text-yellow-700 space-y-1">
              {passwordErrors.map((err, i) => (
                <li key={i}>• {err}</li>
              ))}
            </ul>
          </div>
        )}

        <Input
          label="Confirm Password"
          type="password"
          name="confirmPassword"
          icon={<Lock size={18} />}
          placeholder="Confirm your password"
          value={formData.confirmPassword}
          onChange={handleChange}
          error={errors.confirmPassword}
          disabled={isLoading}
        />

        <Button
          type="submit"
          variant="primary"
          size="lg"
          className="w-full mt-6"
          isLoading={isLoading}
        >
          Create Account
        </Button>
      </form>

      <div className="mt-6 pt-6 border-t border-secondary-200">
        <p className="text-center text-secondary-600 text-sm">
          Already have an account?{' '}
          <Link
            to="/login"
            className="text-primary-600 hover:text-primary-700 font-semibold"
          >
            Sign in here
          </Link>
        </p>
      </div>
    </AuthLayout>
  )
}
