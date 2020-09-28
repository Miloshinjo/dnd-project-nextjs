import { queryField } from '@nexus/schema'

import errors from '../../../utils/errors'
import { handleError } from '../../../utils/helpers'

export const skills = queryField('skills', {
  type: 'Skill',
  list: true,
  resolve: async (parent, args, { prisma }) => {
    try {
      const skills = await prisma.skill.findMany({
        orderBy: {
          name: 'asc',
        },
      })

      return skills
    } catch (err) {
      console.log(err)
      return handleError(errors.serverError)
    }
  },
})
