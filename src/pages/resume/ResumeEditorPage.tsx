import { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { ArrowLeft } from 'lucide-react'
import { Resume } from '@types/index'
import { useResumeStore } from '@stores/resumeStore'
import { useProtectedRoute } from '@hooks/useProtectedRoute'
import { MainLayout, Sidebar, SidebarItem, Header, Button, Card, CardBody, CardHeader, Input, Container, Alert } from '@components'

export function ResumeEditorPage() {
  const navigate = useNavigate()
  const { id } = useParams<{ id: string }>()
  const { isAuthenticated, isLoading: authLoading } = useProtectedRoute()
  const { currentResume, fetchResumeById, updateResume, isLoading, error } = useResumeStore()
  const [formData, setFormData] = useState<Partial<Resume>>({
    title: '',
    description: '',
  })

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleSave = async () => {
    if (id && id !== 'new') {
      await updateResume(id, formData)
    }
  }

  if (authLoading) return <div>Loading...</div>

  const sidebar = (
    <Sidebar>
      <div className="p-6 border-b border-secondary-700">
        <h2 className="text-xl font-bold">Resume Editor</h2>
      </div>
    </Sidebar>
  )

  const header = (
    <Header>
      <div className="flex items-center gap-4">
        <button
          onClick={() => navigate('/dashboard')}
          className="p-2 hover:bg-secondary-100 rounded-lg transition-colors"
        >
          <ArrowLeft size={24} />
        </button>
        <div>
          <h1 className="text-2xl font-bold text-secondary-900">Resume Editor</h1>
          <p className="text-sm text-secondary-600">Edit your resume details</p>
        </div>
      </div>
    </Header>
  )

  return (
    <MainLayout sidebar={sidebar} header={header}>
      <Container className="py-8 max-w-4xl">
        {error && (
          <Alert
            type="error"
            message={error}
            className="mb-6"
          />
        )}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Editor Panel */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <h2 className="text-lg font-semibold text-secondary-900">Resume Details</h2>
              </CardHeader>
              <CardBody className="space-y-6">
                <Input
                  label="Resume Title"
                  type="text"
                  name="title"
                  placeholder="e.g., Senior Software Engineer"
                  value={formData.title || ''}
                  onChange={handleInputChange}
                />

                <div>
                  <label className="block text-sm font-medium text-secondary-700 mb-2">
                    Description
                  </label>
                  <textarea
                    name="description"
                    placeholder="Optional: Add notes about this resume"
                    value={formData.description || ''}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2.5 border border-secondary-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-200"
                    rows={4}
                  />
                </div>

                <div className="flex gap-4 pt-4">
                  <Button
                    variant="primary"
                    onClick={handleSave}
                    isLoading={isLoading}
                  >
                    Save Changes
                  </Button>
                  <Button
                    variant="outline"
                    onClick={() => navigate('/dashboard')}
                  >
                    Cancel
                  </Button>
                </div>
              </CardBody>
            </Card>
          </div>

          {/* Sidebar - Sections */}
          <div className="space-y-4">
            <Card>
              <CardHeader>
                <h3 className="font-semibold text-secondary-900">Sections</h3>
              </CardHeader>
              <CardBody className="space-y-2">
                <button className="w-full text-left px-3 py-2 rounded-lg hover:bg-primary-50 text-primary-600 font-medium transition-colors">
                  Personal Info
                </button>
                <button className="w-full text-left px-3 py-2 rounded-lg hover:bg-secondary-100 text-secondary-700 transition-colors">
                  Experience
                </button>
                <button className="w-full text-left px-3 py-2 rounded-lg hover:bg-secondary-100 text-secondary-700 transition-colors">
                  Education
                </button>
                <button className="w-full text-left px-3 py-2 rounded-lg hover:bg-secondary-100 text-secondary-700 transition-colors">
                  Skills
                </button>
              </CardBody>
            </Card>
          </div>
        </div>
      </Container>
    </MainLayout>
  )
}
