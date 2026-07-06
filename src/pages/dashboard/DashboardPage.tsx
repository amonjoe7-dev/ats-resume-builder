import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { Plus, FileText, Trash2, Edit2 } from 'lucide-react'
import { useResumeStore } from '@stores/resumeStore'
import { useProtectedRoute } from '@hooks/useProtectedRoute'
import { MainLayout, Sidebar, SidebarItem, Header, Card, CardBody, Button, Alert, Container, Badge } from '@components'
import { useAuth } from '@hooks/useAuth'

export function DashboardPage() {
  const navigate = useNavigate()
  const { isAuthenticated, isLoading: authLoading } = useProtectedRoute()
  const { resumes, fetchResumes, isLoading, error } = useResumeStore()
  const { logout } = useAuth()

  useEffect(() => {
    if (isAuthenticated) {
      fetchResumes()
    }
  }, [isAuthenticated, fetchResumes])

  if (authLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600 mb-4"></div>
          <p className="text-secondary-600">Loading...</p>
        </div>
      </div>
    )
  }

  const sidebar = (
    <Sidebar>
      <div className="p-6 border-b border-secondary-700">
        <h2 className="text-xl font-bold">Resume Builder</h2>
        <p className="text-sm text-secondary-300">ATS Optimized</p>
      </div>
      <nav className="mt-6 space-y-1">
        <SidebarItem
          icon={<FileText size={20} />}
          label="My Resumes"
          isActive
        />
        <SidebarItem
          icon={<Plus size={20} />}
          label="Create New"
          onClick={() => navigate('/resume/new')}
        />
      </nav>
      <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-secondary-700">
        <button
          onClick={logout}
          className="w-full px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg font-medium transition-colors"
        >
          Logout
        </button>
      </div>
    </Sidebar>
  )

  const header = (
    <Header title="My Resumes" />
  )

  return (
    <MainLayout sidebar={sidebar} header={header}>
      <Container className="py-8">
        {error && (
          <Alert
            type="error"
            message={error}
            className="mb-6"
          />
        )}

        <div className="mb-8">
          <Button
            variant="primary"
            onClick={() => navigate('/resume/new')}
            className="flex items-center gap-2"
          >
            <Plus size={20} />
            Create New Resume
          </Button>
        </div>

        {isLoading ? (
          <div className="text-center py-12">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600 mb-4"></div>
            <p className="text-secondary-600">Loading resumes...</p>
          </div>
        ) : resumes.length === 0 ? (
          <Card className="text-center py-12">
            <CardBody>
              <FileText size={48} className="mx-auto text-secondary-300 mb-4" />
              <h3 className="text-lg font-semibold text-secondary-900 mb-2">No Resumes Yet</h3>
              <p className="text-secondary-600 mb-6">Create your first resume to get started</p>
              <Button
                variant="primary"
                onClick={() => navigate('/resume/new')}
              >
                Create Resume
              </Button>
            </CardBody>
          </Card>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {resumes.map((resume) => (
              <Card key={resume.id} className="hover:shadow-lg transition-shadow">
                <CardBody>
                  <div className="mb-4">
                    <h3 className="text-lg font-semibold text-secondary-900 mb-1">
                      {resume.title}
                    </h3>
                    <p className="text-sm text-secondary-600">
                      {resume.description || 'No description'}
                    </p>
                  </div>

                  <div className="mb-4">
                    <div className="flex gap-2 flex-wrap">
                      <Badge size="sm">
                        {resume.experience.length} Experience
                      </Badge>
                      <Badge size="sm" variant="secondary">
                        {resume.skills.length} Skills
                      </Badge>
                    </div>
                  </div>

                  <div className="text-xs text-secondary-500 mb-4">
                    Updated {new Date(resume.updatedAt).toLocaleDateString()}
                  </div>

                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => navigate(`/resume/${resume.id}/edit`)}
                      className="flex-1 flex items-center justify-center gap-1"
                    >
                      <Edit2 size={16} />
                      Edit
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => navigate(`/resume/${resume.id}/preview`)}
                    >
                      View
                    </Button>
                  </div>
                </CardBody>
              </Card>
            ))}
          </div>
        )}
      </Container>
    </MainLayout>
  )
}
