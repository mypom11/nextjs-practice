import { MongoClient } from 'mongodb'

export const connectToDatabase = async () => {
  const client = await MongoClient.connect(
    process.env.NEXT_PUBLIC_MONGODB_URL as string
  )

  return client
}
