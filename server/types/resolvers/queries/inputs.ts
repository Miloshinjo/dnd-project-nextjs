import { inputObjectType } from '@nexus/schema'

export const CharacterQueryInputType = inputObjectType({
  name: 'CharacterQueryInputType',
  definition(t) {
    t.id('id', { required: true })
  },
})
