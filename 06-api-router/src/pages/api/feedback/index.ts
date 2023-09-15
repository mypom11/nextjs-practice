import { NextApiRequest, NextApiResponse } from 'next'
import fs from 'fs'
import path from 'path'

interface ResponseData {
  message?: string
  feedback?: {}
}

type apiModel = (
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>
) => void

export const buildFeedbackPath = () => {
  return path.join(process.cwd(), 'src', 'data', 'feedback.json')
}

export const extractFeedback = (filePath: string) => {
  const fileData = fs.readFileSync(filePath, { encoding: 'utf-8' })
  const data = JSON.parse(fileData)
  return data
}

const handler: apiModel = (req, res) => {
  if (req.method === 'POST') {
    const { email, text } = req.body

    const newFeedback = { id: new Date().toISOString(), email, text }

    const filePath = buildFeedbackPath()
    const data = extractFeedback(filePath)
    data.push(newFeedback)
    fs.writeFileSync(filePath, JSON.stringify(data))

    res.status(201).json({ message: 'Success!', feedback: newFeedback })
  } else {
    const filePath = buildFeedbackPath()
    const data = extractFeedback(filePath)
    const result: ResponseData = { feedback: data }
    res.status(200).json(result)
  }
}

export default handler
