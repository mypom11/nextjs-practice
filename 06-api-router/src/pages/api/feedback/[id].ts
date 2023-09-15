import { NextApiRequest, NextApiResponse } from 'next'
import { buildFeedbackPath, extractFeedback } from '.'
type apiModel = (req: NextApiRequest, res: NextApiResponse) => void

interface feedbackModel {
  id: string
  text: string
  email: string
}

const handler: apiModel = (req, res) => {
  if (req.method === 'DELETE') {
    //
  }

  const feedbackId = req.query.id

  const filePath = buildFeedbackPath()
  const feedbackData = extractFeedback(filePath)

  const selectedFeedBack = feedbackData.find(
    (feedback: feedbackModel) => feedback.id === feedbackId
  )

  res.status(200).json({ feedback: selectedFeedBack })
}

export default handler
