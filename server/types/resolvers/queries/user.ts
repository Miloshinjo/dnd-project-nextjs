import { queryField } from '@nexus/schema'

import errors from '../../../utils/errors'
import { handleError, getUserId } from '../../../utils/helpers'

export const me = queryField('me', {
  type: 'User',
  resolve: async (_parent, _args, { prisma, req }) => {
    try {
      const userId = await getUserId(req)

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
