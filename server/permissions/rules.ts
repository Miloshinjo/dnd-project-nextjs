import { rule } from 'graphql-shield'

import errors from '../utils/errors'
import { handleError, getUserId } from '../utils/helpers'

const rules = {
  isAuthenticatedUser: rule({ cache: 'contextual' })(
    async (_parent, _args, { req }) => {
      const userId = await getUserId(req)

      try {
        if (!userId) {
          return handleError(errors.notAuthenticated)
        }
        return true
      } catch (e) {
        return e
      }
    },
  ),
  isCharacterOwner: rule({
    cache: 'contextual',
  })(async (_parent, { character }, { prisma, req }) => {
    try {
      const userId = await getUserId(req)

      const user = await prisma.character
        .findOne({
          where: {
            id: Number(character.id),
          },
        })
        .user()

      return userId === user?.id
    } catch (e) {
      return e
    }
  }),
}

export { rules as default }
