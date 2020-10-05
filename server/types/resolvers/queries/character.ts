import { queryField } from '@nexus/schema'
import { getUserId } from '../../../utils/helpers'

import errors from '../../../utils/errors'
import { handleError } from '../../../utils/helpers'

export const characters = queryField('characters', {
  type: 'Character',
  list: true,
  resolve: async (parent, args, { prisma, req }) => {
    const userId = await getUserId(req)

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
    character: 'CharacterQueryInputType',
  },
  resolve: async (parent, { character }, { prisma }) => {
    try {
      return prisma.character.findOne({
        where: { id: Number(character.id) },
      })
    } catch (err) {
      console.log(err)
      return handleError(errors.serverError)
    }
  },
})
