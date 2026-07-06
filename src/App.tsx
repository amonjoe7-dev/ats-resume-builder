import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import { LoginPage, SignupPage, ForgotPasswordPage } from '@/pages/auth'
import { DashboardPage } from '@/pages/dashboard'
import { ResumeEditorPage, ResumePreviewPage } from '@/pages/resume'

function App() {
  return (
    <Router>
      <Routes>
        {/* Auth Routes */}
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/forgot-password" element={<ForgotPasswordPage />} />

        {/* Dashboard Routes */}
        <Route path="/dashboard" element={<DashboardPage />} />

        {/* Resume Routes */}
        <Route path="/resume/new" element={<ResumeEditorPage />} />
        <Route path="/resume/:id/edit" element={<ResumeEditorPage />} />
        <Route path="/resume/:id/preview" element={<ResumePreviewPage />} />

        {/* Default Route */}
        <Route path="/" element={<Navigate to="/dashboard" replace />} />
      </Routes>
    </Router>
  )
}

export default App
