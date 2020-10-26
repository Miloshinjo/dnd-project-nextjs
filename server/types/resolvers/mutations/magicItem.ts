import { mutationField } from '@nexus/schema'

import errors from '../../../utils/errors'
import { handleError } from '../../../utils/helpers'

export const createMagicItem = mutationField('createMagicItem', {
  type: 'MagicItem',
  args: {
    item: 'MagicItemCreateInput',
  },
  async resolve(_parent, { item }, { prisma }) {
    if (!item) {
      return handleError(errors.serverError)
    }

    try {
      const { characterId, ...restItem } = item

      const createdMagicItem = await prisma.magicItem.create({
        data: {
          ...restItem,
          Character: { connect: { id: Number(characterId) } },
        },
      })

      return createdMagicItem
    } catch (err) {
      console.log(err)
      return handleError(errors.badCharacterData)
    }
  },
})
