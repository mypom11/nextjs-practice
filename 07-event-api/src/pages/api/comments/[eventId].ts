import { apiModel, commentModel } from '@/model'
import { connectDb, getAllDocuments, insertDocument } from '@/helpers/db-util'

const handler: apiModel = async (req, res) => {
  const eventId = req.query.eventId

  let client
  try {
    client = await connectDb()
  } catch (error) {
    res.status(500).json({ messge: 'Connecting to the database failed!' })
    return
  }

  if (req.method === 'POST') {
    const { email, name, text } = req.body

    if (
      !email.includes('@') ||
      !name ||
      name.trim() === '' ||
      !text ||
      text.trim() === ''
    ) {
      res.status(422).json({ message: 'Invalud input' })
      client.close()
      return
    }

    let newComment: commentModel = {
      email,
      name,
      text,
    }

    try {
      const result = insertDocument(client, 'comments', newComment)
      res.status(201).json({ message: 'Added comment', comment: newComment })
    } catch (error) {
      res.status(500).json({ messge: 'Inserting data failed' })
    }
  }
  if (req.method === 'GET') {
    try {
      const documents = await getAllDocuments(
        client,
        'comments',
        { _id: -1 },
        { eventId: eventId }
      )
      res.status(200).json({ comments: documents })
    } catch (error) {
      res.status(500).json({ messge: 'Getting comments failed' })
    }
  }
  client.close()
}

export default handler
