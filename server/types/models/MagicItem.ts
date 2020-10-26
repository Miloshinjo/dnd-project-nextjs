import { objectType } from '@nexus/schema'

export const MagicItem = objectType({
  name: 'MagicItem',
  definition(t) {
    t.model.id()
    t.model.name()
    t.model.description()
    t.model.armorType()
    t.model.attachedSpells()
    t.model.rarity()
    t.model.magicBonus()
    t.model.attunement()
    t.model.type()
    t.model.weaponType()
    t.model.armorType()
  },
})
