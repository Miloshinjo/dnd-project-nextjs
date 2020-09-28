import jwt from 'jsonwebtoken'

import { ApolloError } from 'apollo-server-express'

import { JWT_SECRET, tokens } from './constants'

const handleError = (error: ApolloError): any => {
  // add any other logging mechanism here e.g. Sentry

  return error
}

const generateAccessToken = (userId: number): string => {
  return jwt.sign(
    { userId, type: tokens.access.name, timestamp: Date.now() },
    JWT_SECRET as string,
    {
      expiresIn: tokens.access.expiry,
    }
  )
}

export { handleError, generateAccessToken }
