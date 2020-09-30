import { NextApiHandler } from 'next'
import NextAuth from 'next-auth'
import Providers from 'next-auth/providers'
import Adapters from 'next-auth/adapters'
import { prisma } from '../../../server/utils/context'

const options = {
  providers: [
    Providers.GitHub({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET,
    }),
  ],
  session: {
    maxAge: 30 * 24 * 60 * 60,
  },
  adapter: Adapters.Prisma.Adapter({ prisma }),
  secret: process.env.SECRET,
  callbacks: {
    session: async (session, user) => {
      session.user.id = user.id
      return Promise.resolve(session)
    },
  },
}

const authHandler: NextApiHandler = (req, res) =>
  NextAuth(req, res, options as any)

export { authHandler as default }