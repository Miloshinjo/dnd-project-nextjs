import { queryField, idArg } from '@nexus/schema'

import errors from '../../../utils/errors'
import { handleError } from '../../../utils/helpers'

export const klasses = queryField('klasses', {
  type: 'Klass',
  list: true,
  resolve: async (parent, args, { prisma }) => {
    try {
      const klasses = await prisma.klass.findMany({
        orderBy: {
          name: 'asc',
        },
      })

      return klasses
    } catch (err) {
      console.log(err)
      return handleError(errors.serverError)
    }
  },
})

export const klass = queryField('klass', {
  type: 'Klass',
  args: {
    id: idArg(),
  },
  resolve: async (parent, { id }, { prisma }) => {
    try {
      const klass = await prisma.klass.findOne({
        where: { id },
      })
      return klass
    } catch (err) {
      console.log(err)
      return handleError(errors.serverError)
    }
  },
})
