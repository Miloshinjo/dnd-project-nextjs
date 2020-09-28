import { objectType } from '@nexus/schema'

export const Spell = objectType({
  name: 'Spell',
  definition(t) {
    t.model.id()
    t.model.attackSave()
    t.model.castingTime()
    t.model.klasses()
    t.model.components()
    t.model.concentration()
    t.model.damageEffect()
    t.model.description()
    t.model.duration()
    t.model.level()
    t.model.name()
    t.model.range()
    t.model.ritual()
    t.model.school()
    t.model.material()
    t.model.characters()
  },
})
