import { Character, Klass, Skill, SubClass, Spell } from '../generated/graphql'

export type CharacterUI = {
  id: Character['id']
  level: Character['level']
  name: Character['name']
  race: Character['race']
  hitPoints: Character['hitPoints']
  maxHitPoints: Character['maxHitPoints']
  armorClass: Character['armorClass']
  alignment: Character['alignment']
  gold?: Character['gold']
  strength: Character['strength']
  dexterity: Character['dexterity']
  constitution: Character['constitution']
  wisdom: Character['wisdom']
  intelligence: Character['intelligence']
  charisma: Character['charisma']
  spellSlots?: Character['spellSlots']
  speed: Character['speed']
  subclass?: {
    id: SubClass['id']
    name: SubClass['name']
    spellCastingModifier?: SubClass['spellCastingModifier']
  }
  klass: {
    id: Klass['id']
    name: Klass['name']
    hitDie: Klass['hitDie']
    spellCastingModifier?: Klass['spellCastingModifier']
  }
  spells: Array<{
    id: Spell['id']
    name: Spell['name']
    level: Spell['level']
    concentration: Spell['concentration']
    ritual: Spell['ritual']
  }>
  preparedSpells: Array<{
    id: Spell['id']
    name: Spell['name']
    level: Spell['level']
    concentration: Spell['concentration']
    ritual: Spell['ritual']
  }>
  skills: Array<{
    id: Skill['id']
    name: Skill['name']
    ability: Skill['ability']
  }>
  arcaneWard: Character['arcaneWard']
  arcaneWardMax: Character['arcaneWardMax']
}
