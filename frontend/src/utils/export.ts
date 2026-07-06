import jsPDF from 'jspdf'
import html2canvas from 'html2canvas'
import { Resume } from '@types/index'

export async function downloadResumePDF(resumeElement: HTMLElement, fileName: string = 'resume.pdf'): Promise<void> {
  try {
    const canvas = await html2canvas(resumeElement, {
      scale: 2,
      logging: false,
      useCORS: true,
    })

    const imgData = canvas.toDataURL('image/png')
    const pdf = new jsPDF({
      orientation: 'portrait',
      unit: 'mm',
      format: 'a4',
    })

    const imgWidth = 210
    const pageHeight = 295
    const imgHeight = (canvas.height * imgWidth) / canvas.width
    let heightLeft = imgHeight

    let position = 0

    pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight)
    heightLeft -= pageHeight

    while (heightLeft >= 0) {
      position = heightLeft - imgHeight
      pdf.addPage()
      pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight)
      heightLeft -= pageHeight
    }

    pdf.save(fileName)
  } catch (error) {
    console.error('Error generating PDF:', error)
    throw new Error('Failed to generate PDF')
  }
}

export function downloadResumeDOCX(resume: Resume, fileName: string = 'resume.docx'): void {
  try {
    // Placeholder for DOCX generation
    // In production, use a library like docx or similar
    console.log('DOCX download initiated for:', fileName)
  } catch (error) {
    console.error('Error generating DOCX:', error)
    throw new Error('Failed to generate DOCX')
  }
}
