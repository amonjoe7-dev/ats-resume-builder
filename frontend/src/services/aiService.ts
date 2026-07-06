import { AIRequest, AIResponse } from '@types/index'
import { apiClient } from '@utils/api'

class AIService {
  async improveContent(content: string, context: string): Promise<AIResponse> {
    try {
      const response = await apiClient.post<AIResponse>('/ai/improve', {
        content,
        context,
        type: 'improve',
      })
      return response.data || { content: '', suggestions: [] }
    } catch (error) {
      console.error('Error improving content:', error)
      throw error
    }
  }

  async generateContent(prompt: string, context: string): Promise<AIResponse> {
    try {
      const response = await apiClient.post<AIResponse>('/ai/generate', {
        content: prompt,
        context,
        type: 'generate',
      })
      return response.data || { content: '', suggestions: [] }
    } catch (error) {
      console.error('Error generating content:', error)
      throw error
    }
  }

  async getSuggestions(content: string, context: string): Promise<AIResponse> {
    try {
      const response = await apiClient.post<AIResponse>('/ai/suggest', {
        content,
        context,
        type: 'suggest',
      })
      return response.data || { content: '', suggestions: [] }
    } catch (error) {
      console.error('Error getting suggestions:', error)
      throw error
    }
  }

  async calculateATSScore(resumeContent: string): Promise<{ score: number; feedback: string[] }> {
    try {
      const response = await apiClient.post<{ score: number; feedback: string[] }>(
        '/ai/ats-score',
        { content: resumeContent }
      )
      return response.data || { score: 0, feedback: [] }
    } catch (error) {
      console.error('Error calculating ATS score:', error)
      throw error
    }
  }
}

export const aiService = new AIService()
