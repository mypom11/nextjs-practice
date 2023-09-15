import { apiModel } from '@/model'
import { connectDb, insertDocument } from '@/helpers/db-util'

const handler: apiModel = async (req, res) => {
  if (req.method === 'POST') {
    const { email } = req.body

    if (!email || !email.includes('@')) {
      res.status(422).json({ message: 'InValid email address.' })
      return
    }

    let client

    try {
      client = await connectDb()
    } catch (error) {
      res.status(500).json({ messge: 'Connecting to the database failed!' })
      return
    }

    try {
      await insertDocument(client!, 'newsletter', { email })
      client!.close()
    } catch (error) {
      res.status(500).json({ messge: 'Inserting data failed' })
      return
    }

    res.status(201).json({ message: 'Signed up!' })
  }
}

export default handler
