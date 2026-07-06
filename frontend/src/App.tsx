import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'

// Pages
const LandingPage = () => <div>Landing Page</div>
const LoginPage = () => <div>Login Page</div>
const SignupPage = () => <div>Signup Page</div>
const DashboardPage = () => <div>Dashboard Page</div>
const ResumesPage = () => <div>Resumes Page</div>
const CoverLettersPage = () => <div>Cover Letters Page</div>
const JobTrackerPage = () => <div>Job Tracker Page</div>
const ResumeEditorPage = () => <div>Resume Editor Page</div>
const ResumePreviewPage = () => <div>Resume Preview Page</div>

function App() {
  return (
    <Router>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />

        {/* Protected Routes */}
        <Route path="/dashboard" element={<DashboardPage />} />
        <Route path="/resumes" element={<ResumesPage />} />
        <Route path="/cover-letters" element={<CoverLettersPage />} />
        <Route path="/job-tracker" element={<JobTrackerPage />} />

        {/* Resume Routes */}
        <Route path="/resume/new" element={<ResumeEditorPage />} />
        <Route path="/resume/:id/edit" element={<ResumeEditorPage />} />
        <Route path="/resume/:id/preview" element={<ResumePreviewPage />} />

        {/* Catch all */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  )
}

export default App
