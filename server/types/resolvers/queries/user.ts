import { queryField } from '@nexus/schema'

import errors from '../../../utils/errors'
import { handleError } from '../../../utils/helpers'

export const me = queryField('me', {
  type: 'User',
  resolve: async (_parent, _args, { prisma, userId }) => {
    try {
      const user = await prisma.user.findOne({
        where: { id: userId },
      })
      return user
    } catch (err) {
      console.log(err)
      return handleError(errors.serverError)
    }
  },
})
