import { getSession } from 'next-auth/client'

import { ApolloError } from 'apollo-server-micro'

const handleError = (error: ApolloError): any => {
  // add any other logging mechanism here e.g. Sentry

  return error
}

// const getUserByAccountId = async (prisma) => {
//   return
// }

const getUserId = async (req): Promise<number | undefined> => {
  const session = await getSession({ req })
  return (session?.user as any)?.id
}

export { handleError, getUserId }
