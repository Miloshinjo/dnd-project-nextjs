import { queryField, idArg } from '@nexus/schema'

import errors from '../../../utils/errors'
import { handleError } from '../../../utils/helpers'

export const characters = queryField('characters', {
  type: 'Character',
  list: true,
  resolve: async (parent, args, { prisma, userId }) => {
    try {
      const character = await prisma.character.findMany({
        where: { userId },
      })

      return character
    } catch (err) {
      console.log(err)
      return handleError(errors.serverError)
    }
  },
})

export const character = queryField('character', {
  type: 'Character',
  args: {
    id: idArg(),
  },
  resolve: async (parent, { id }, { prisma }) => {
    return prisma.character.findOne({
      where: { id },
    })
  },
})
