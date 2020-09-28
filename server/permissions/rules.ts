import { rule } from 'graphql-shield'

import { handleError } from '../utils/helpers'
import errors from '../utils/errors'

const rules = {
  isAuthenticatedUser: rule({ cache: 'contextual' })(
    (_parent, _args, { userId }) => {
      try {
        if (!userId) {
          return handleError(errors.notAuthenticated)
        }
        return true
      } catch (e) {
        return e
      }
    }
  ),
  isCharacterOwner: rule({
    cache: 'contextual',
  })(async (_parent, { character }, { prisma, userId }) => {
    try {
      const user = await prisma.character
        .findOne({
          where: {
            id: character.id,
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
