import { hashPassword, verifyPassword } from '@/lib/auth'
import { connectToDatabase } from '@/lib/db'
import { NextApiRequest, NextApiResponse } from 'next'
import { getSession } from 'next-auth/react'

type apiModel = (req: NextApiRequest, res: NextApiResponse) => void

const handler: apiModel = async (req, res) => {
  if (req.method !== 'PATCH') {
    return
  }

  const session = await getSession({ req })
  console.log(session)
  if (!session) {
    res.status(401).json({ message: 'Not authenticated!' })
    return
  }

  const userEmail = session.user!.email
  const oldPassword = req.body.oldPassword
  const newPassword = req.body.newPassword

  const client = await connectToDatabase()

  const usersCollection = client.db().collection('users')
  const user = await usersCollection.findOne({ email: userEmail })

  if (!user) {
    res.status(404).json({ message: 'User not found' })
    client.close()
    return
  }

  const currentPassword = user.password
  const passwordAreEqual = await verifyPassword(oldPassword, currentPassword)

  if (!passwordAreEqual) {
    res.status(403).json({ message: 'Invalid password.' })
    client.close()
    return
  }
  const hashedPassword = await hashPassword(newPassword)

  const result = await usersCollection.updateOne(
    { email: userEmail },
    { $set: { password: hashedPassword } }
  )

  client.close()
  res.status(200).json({ message: 'Password updated' })
}

export default handler
