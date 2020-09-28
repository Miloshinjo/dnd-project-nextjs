import { mutationField, stringArg } from '@nexus/schema'
import bcrypt from 'bcryptjs'

import errors from '../../../utils/errors'
import { handleError } from '../../../utils/helpers'

import { generateAccessToken } from '../../../utils/helpers'

export const signup = mutationField('signup', {
  type: 'AuthPayload',
  args: {
    user: 'UserCreateInput',
  },
  async resolve(_parent, { user }, { prisma }) {
    if (!user) {
      return handleError(errors.serverError)
    }

    const { username, email, password, passwordConfirm } = user

    if (password.length < 8) {
      return handleError(errors.passwordTooShort)
    }

    if (username.length < 2) {
      return handleError(errors.usernameTooShort)
    }

    if (password !== passwordConfirm) {
      return handleError(errors.passwordsMismatch)
    }

    const hashedPassword: string = await bcrypt.hash(password, 10)

    const createdUser = await prisma.user.create({
      data: {
        email,
        username,
        password: hashedPassword,
      },
    })

    if (!createdUser) {
      return handleError(errors.serverError)
    }

    return {
      user: createdUser,
      token: generateAccessToken(createdUser.id),
    }
  },
})

export const login = mutationField('login', {
  type: 'AuthPayload',
  args: {
    email: stringArg({ nullable: false }),
    password: stringArg({ nullable: false }),
  },
  async resolve(_parent, { email, password }, { prisma }) {
    const user = await prisma.user.findOne({
      where: {
        email,
      },
    })

    if (!user) {
      return handleError(errors.invalidUser)
    }

    const passwordValid = await bcrypt.compare(password, user.password)

    if (!passwordValid) {
      return handleError(errors.invalidUser)
    }

    return {
      user,
      token: generateAccessToken(user.id),
    }
  },
})
