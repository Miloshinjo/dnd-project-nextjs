import { objectType } from '@nexus/schema'

export const Character = objectType({
  name: 'Character',
  definition(t) {
    t.model.id()
    t.model.name()
    t.model.level()
    t.model.race()
    t.model.klassId()
    t.model.klass()
    t.model.alignment()
    t.model.armorClass()
    t.model.hitPoints()
    t.model.maxHitPoints()
    t.model.gold()
    t.model.inspiration()
    t.model.strength()
    t.model.dexterity()
    t.model.constitution()
    t.model.intelligence()
    t.model.wisdom()
    t.model.charisma()
    t.model.userId()
    t.model.user()
    t.model.spells()
    t.model.preparedSpells()
    t.model.skills()
    t.model.subclass()
    t.model.subclassId()
    t.model.spellSlots()
    t.model.speed()
  },
})
