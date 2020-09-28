import { queryField, idArg, stringArg } from '@nexus/schema'

import errors from '../../../utils/errors'
import { handleError } from '../../../utils/helpers'

export const spells = queryField('spells', {
  type: 'Spell',
  args: {
    klassName: stringArg({ nullable: true }),
  },
  list: true,
  resolve: async (parent, { klassName }, { prisma }) => {
    try {
      if (klassName) {
        const spells = await prisma.spell.findMany({
          where: {
            klasses: {
              contains: klassName,
            },
          },
          orderBy: [{ level: 'asc' }, { name: 'asc' }],
        })

        return spells
      }

      const spells = await prisma.spell.findMany({
        orderBy: [{ level: 'asc' }, { name: 'asc' }],
      })

      return spells
    } catch (err) {
      console.log(err)
      return handleError(errors.serverError)
    }
  },
})

export const spell = queryField('spell', {
  type: 'Spell',
  args: {
    id: idArg(),
  },
  resolve: async (parent, { id }, { prisma }) => {
    try {
      const spell = await prisma.spell.findOne({
        where: { id },
      })
      return spell
    } catch (err) {
      console.log(err)
      return handleError(errors.serverError)
    }
  },
})
