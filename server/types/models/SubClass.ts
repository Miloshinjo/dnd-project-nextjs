import { objectType } from '@nexus/schema'

export const SubClass = objectType({
  name: 'SubClass',
  definition(t) {
    t.model.id()
    t.model.name()
    t.model.spellCastingModifier()
    t.model.klassId()
    t.model.klass()
    t.model.source()
  },
})
