import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { Mail, ArrowLeft } from 'lucide-react'
import { AuthLayout, Button, Input, Alert } from '@components'
import { validateEmail } from '@utils/validation'
import { apiClient } from '@utils/api'

export function ForgotPasswordPage() {
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [error, setError] = useState('')
  const [success, setSuccess] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [emailError, setEmailError] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setEmailError('')
    setError('')

    if (!email) {
      setEmailError('Email is required')
      return
    }

    if (!validateEmail(email)) {
      setEmailError('Please enter a valid email')
      return
    }

    setIsLoading(true)
    try {
      const response = await apiClient.post('/auth/forgot-password', { email })
      if (response.success) {
        setSuccess(true)
      } else {
        setError(response.error || 'Failed to send reset email')
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred')
    } finally {
      setIsLoading(false)
    }
  }

  if (success) {
    return (
      <AuthLayout>
        <div className="text-center">
          <div className="mb-4">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 rounded-full">
              <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
          </div>
          <h1 className="text-2xl font-bold text-secondary-900 mb-2">Check Your Email</h1>
          <p className="text-secondary-600 mb-6">
            We've sent a password reset link to <strong>{email}</strong>. Please check your email and follow the instructions.
          </p>
          <Link
            to="/login"
            className="text-primary-600 hover:text-primary-700 font-semibold flex items-center justify-center gap-2"
          >
            <ArrowLeft size={18} />
            Back to Login
          </Link>
        </div>
      </AuthLayout>
    )
  }

  return (
    <AuthLayout>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-secondary-900 mb-2">Reset Password</h1>
        <p className="text-secondary-600">Enter your email to receive a reset link</p>
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
          icon={<Mail size={18} />}
          placeholder="you@example.com"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value)
            setEmailError('')
          }}
          error={emailError}
          disabled={isLoading}
        />

        <Button
          type="submit"
          variant="primary"
          size="lg"
          className="w-full"
          isLoading={isLoading}
        >
          Send Reset Link
        </Button>
      </form>

      <div className="mt-6 pt-6 border-t border-secondary-200">
        <Link
          to="/login"
          className="flex items-center justify-center gap-2 text-primary-600 hover:text-primary-700 font-semibold"
        >
          <ArrowLeft size={18} />
          Back to Login
        </Link>
      </div>
    </AuthLayout>
  )
}
