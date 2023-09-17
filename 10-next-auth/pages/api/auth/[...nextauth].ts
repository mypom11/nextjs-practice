import { connectToDatabase } from '@/lib/db'
import CredentialsProvider from 'next-auth/providers/credentials'
import NextAuth from 'next-auth/next'
import { verifyPassword } from '@/lib/auth'

export default NextAuth({
  session: {
    strategy: 'jwt',
  },
  providers: [
    CredentialsProvider({
      async authorize(credentials) {
        const { email, password } = credentials!
        const client = await connectToDatabase()

        const usersCollection = client.db().collection('users')

        const user = await usersCollection.findOne({ email: email })

        if (!user) {
          client.close()
          throw new Error('No user Found')
        }

        const isValid = await verifyPassword(password, user.password)

        if (!isValid) {
          throw new Error('Could not log you in')
        }
        client.close()
        return {
          email: user.email,
        }
      },
    }),
  ],
})
