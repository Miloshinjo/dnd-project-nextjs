import { inputObjectType } from '@nexus/schema'

export const UserInputType = inputObjectType({
  name: 'UserCreateInput',
  definition: (t) => {
    t.string('email', {
      required: true,
    })
    t.string('password', {
      required: true,
    })
    t.string('passwordConfirm', {
      required: true,
    })
    t.string('username', {
      required: true,
    })
  },
})

export const CharacterInputType = inputObjectType({
  name: 'CharacterCreateInput',
  definition: (t) => {
    t.string('name', {
      required: true,
    })
    t.id('klassId', {
      required: true,
    })
    t.string('race', {
      required: true,
    })
    t.string('alignment', {
      required: true,
    })
  },
})

export const CharacterUpdateInputType = inputObjectType({
  name: 'CharacterUpdateInput',
  definition(t) {
    t.id('id', { required: true })
    t.id('klassId')
    t.id('skillId')
    t.id('subclassId')
    t.id('spellId')
    t.string('name')
    t.int('level')
    t.string('race')
    t.string('alignment')
    t.int('armorClass')
    t.int('maxHitPoints')
    t.int('hitPoints')
    t.int('gold')
    t.boolean('inspiration')
    t.int('strength')
    t.int('dexterity')
    t.int('constitution')
    t.int('intelligence')
    t.int('wisdom')
    t.int('charisma')
    t.int('speed')
    t.string('spellSlots')
  },
})

export const CharacterEditSpellInputType = inputObjectType({
  name: 'CharacterEditSpellInput',
  definition(t) {
    t.id('id', { required: true })
    t.id('spellId', { required: true })
  },
})

export const CharacterDeleteInputType = inputObjectType({
  name: 'CharacterDeleteInput',
  definition(t) {
    t.id('id', { required: true })
  },
})

export const CharacterAddSubclassInputType = inputObjectType({
  name: 'CharacterAddSubclassInputType',
  definition(t) {
    t.id('id', { required: true })
    t.id('subclassId', { required: true })
  },
})
