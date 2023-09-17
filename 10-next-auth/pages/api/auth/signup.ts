import { hashPassword } from '@/lib/auth'
import { connectToDatabase } from '@/lib/db'
import { NextApiRequest, NextApiResponse } from 'next'

type apiModel = (req: NextApiRequest, res: NextApiResponse) => void

const handler: apiModel = async (req, res) => {
  if (req.method !== 'POST') {
    return
  }
  const { email, password } = req.body

  if (
    !email ||
    !email.includes('@') ||
    !password ||
    password.trim().length < 7
  ) {
    res.status(422).json({
      message: 'Invalid input - password should be at least 7 caracters long.',
    })
    return
  }
  const client = await connectToDatabase()

  const db = client.db()

  const existingUser = await db.collection('users').findOne({ email })
  if (existingUser) {
    res.status(422).json({
      message: 'User exists already!',
    })
    client.close()
    return
  }

  const hashedPassword = await hashPassword(password)

  const result = await db.collection('users').insertOne({
    email,
    password: hashedPassword,
  })

  res.status(201).json({ messge: 'Created user!' })
  client.close()
}

export default handler
