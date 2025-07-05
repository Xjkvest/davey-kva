import NextAuth from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'

export default NextAuth({
  providers: [
    CredentialsProvider({
      name: 'credentials',
      credentials: {
        username: { label: 'Username', type: 'text' },
        password: { label: 'Password', type: 'password' }
      },
      async authorize(credentials) {
        // For demo purposes, using simple credentials
        // In production, you'd validate against a database
        if (credentials?.username === 'admin' && credentials?.password === 'admin123') {
          return {
            id: '1',
            name: 'Admin',
            email: 'admin@example.com',
          }
        }
        return null
      }
    })
  ],
  pages: {
    signIn: '/login',
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id
      }
      return token
    },
    async session({ session, token }) {
      session.user.id = token.id
      return session
    },
  },
  secret: process.env.NEXTAUTH_SECRET || 'your-secret-key-here',
})