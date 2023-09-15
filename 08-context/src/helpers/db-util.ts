import { MongoClient } from 'mongodb'
export const connectDb = async () => {
  const client = await MongoClient.connect(
    process.env.NEXT_PUBLIC_MONGODB_URL as string
  )
  return client
}

export const insertDocument = async (
  client: MongoClient,
  collection: string,
  document: {
    email?: string
    name?: string
    text?: string
  }
) => {
  const db = client.db()
  const result = await db.collection(collection).insertOne(document)
  return result
}

export const getAllDocuments = async (
  client: MongoClient,
  collection: string,
  sort: {},
  filter: {} = {}
) => {
  const db = client.db()
  const documents = await db
    .collection(collection)
    .find(filter)
    .sort(sort)
    .toArray()

  return documents
}
