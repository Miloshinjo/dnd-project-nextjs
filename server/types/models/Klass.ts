import { objectType } from '@nexus/schema'

export const Klass = objectType({
  name: 'Klass',
  definition(t) {
    t.model.id()
    t.model.name()
    t.model.description()
    t.model.hitDie()
    t.model.hitPointsAt1st()
    t.model.primaryAbility()
    t.model.savingThrows()
    t.model.armor()
    t.model.weapons()
    t.model.tools()
    t.model.skills()
    t.model.spellCastingModifier()
    t.model.proficientSkillsAt1st()
    t.model.subClasses()
  },
})
