import { inputObjectType } from '@nexus/schema'

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
    t.int('arcaneWard')
    t.int('arcaneWardMax')
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
  name: 'CharacterAddSubclassInput',
  definition(t) {
    t.id('id', { required: true })
    t.id('subclassId', { required: true })
  },
})

export const CharacterEditSkillInputType = inputObjectType({
  name: 'CharacterEditSkillInput',
  definition(t) {
    t.id('id', { required: true })
    t.id('skillId', { required: true })
  },
})
