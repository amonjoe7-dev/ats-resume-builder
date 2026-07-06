import { useNavigate } from 'react-router-dom'
import { ArrowLeft, Download, Share2 } from 'lucide-react'
import { useProtectedRoute } from '@hooks/useProtectedRoute'
import { MainLayout, Sidebar, SidebarItem, Header, Button, Card, CardBody, Container } from '@components'

export function ResumePreviewPage() {
  const navigate = useNavigate()
  const { isAuthenticated, isLoading: authLoading } = useProtectedRoute()

  if (authLoading) return <div>Loading...</div>

  const sidebar = (
    <Sidebar>
      <div className="p-6 border-b border-secondary-700">
        <h2 className="text-xl font-bold">Resume Preview</h2>
      </div>
    </Sidebar>
  )

  const header = (
    <Header>
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <button
            onClick={() => navigate('/dashboard')}
            className="p-2 hover:bg-secondary-100 rounded-lg transition-colors"
          >
            <ArrowLeft size={24} />
          </button>
          <div>
            <h1 className="text-2xl font-bold text-secondary-900">Resume Preview</h1>
          </div>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" className="flex items-center gap-2">
            <Download size={18} />
            Download PDF
          </Button>
          <Button variant="outline" size="sm" className="flex items-center gap-2">
            <Share2 size={18} />
            Share
          </Button>
        </div>
      </div>
    </Header>
  )

  return (
    <MainLayout sidebar={sidebar} header={header}>
      <Container className="py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Preview Area */}
          <div className="lg:col-span-2">
            <Card>
              <CardBody>
                <div className="bg-white p-8 rounded-lg border-2 border-dashed border-secondary-200">
                  <div className="max-w-3xl mx-auto">
                    <h2 className="text-3xl font-bold text-secondary-900 mb-1">John Doe</h2>
                    <p className="text-secondary-600 mb-6">john@example.com | +1 (555) 123-4567 | San Francisco, CA</p>

                    <section className="mb-8">
                      <h3 className="text-lg font-semibold text-secondary-900 border-b-2 border-primary-600 pb-2 mb-4">
                        Professional Summary
                      </h3>
                      <p className="text-secondary-700 leading-relaxed">
                        Experienced Software Engineer with 5+ years of expertise in full-stack development, cloud architecture, and team leadership. Proven track record of delivering high-impact solutions.
                      </p>
                    </section>

                    <section className="mb-8">
                      <h3 className="text-lg font-semibold text-secondary-900 border-b-2 border-primary-600 pb-2 mb-4">
                        Experience
                      </h3>
                      <div className="space-y-4">
                        <div>
                          <div className="flex justify-between items-start">
                            <div>
                              <h4 className="font-semibold text-secondary-900">Senior Software Engineer</h4>
                              <p className="text-secondary-600">Tech Company Inc.</p>
                            </div>
                            <span className="text-sm text-secondary-500">2021 - Present</span>
                          </div>
                          <ul className="mt-2 ml-4 space-y-1 text-secondary-700 text-sm">
                            <li>• Led development of microservices architecture</li>
                            <li>• Mentored 3+ junior engineers</li>
                            <li>• Improved system performance by 40%</li>
                          </ul>
                        </div>
                      </div>
                    </section>

                    <section>
                      <h3 className="text-lg font-semibold text-secondary-900 border-b-2 border-primary-600 pb-2 mb-4">
                        Skills
                      </h3>
                      <div className="flex flex-wrap gap-2">
                        {['React', 'TypeScript', 'Node.js', 'AWS', 'Docker', 'PostgreSQL'].map((skill) => (
                          <span
                            key={skill}
                            className="px-3 py-1 bg-primary-100 text-primary-800 rounded-full text-sm font-medium"
                          >
                            {skill}
                          </span>
                        ))}
                      </div>
                    </section>
                  </div>
                </div>
              </CardBody>
            </Card>
          </div>

          {/* Template Options */}
          <div>
            <Card>
              <CardBody>
                <h3 className="font-semibold text-secondary-900 mb-4">Templates</h3>
                <div className="space-y-2">
                  <button className="w-full px-4 py-2 bg-primary-100 text-primary-700 rounded-lg font-medium hover:bg-primary-200 transition-colors">
                    Modern (Current)
                  </button>
                  <button className="w-full px-4 py-2 border border-secondary-300 text-secondary-700 rounded-lg font-medium hover:bg-secondary-50 transition-colors">
                    Classic
                  </button>
                  <button className="w-full px-4 py-2 border border-secondary-300 text-secondary-700 rounded-lg font-medium hover:bg-secondary-50 transition-colors">
                    Minimal
                  </button>
                </div>
              </CardBody>
            </Card>
          </div>
        </div>
      </Container>
    </MainLayout>
  )
}
