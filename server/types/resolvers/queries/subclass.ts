import { queryField, stringArg } from '@nexus/schema'

import errors from '../../../utils/errors'
import { handleError } from '../../../utils/helpers'

export const subclasses = queryField('subclasses', {
  type: 'SubClass',
  args: {
    klassName: stringArg({ nullable: false }),
  },
  list: true,
  resolve: async (_, { klassName }, { prisma }) => {
    try {
      const subclasses = await prisma.subClass.findMany({
        where: {
          klass: {
            name: {
              contains: klassName,
            },
          },
        },
        orderBy: [{ name: 'asc' }],
      })

      return subclasses
    } catch (err) {
      console.log(err)
      return handleError(errors.serverError)
    }
  },
})
