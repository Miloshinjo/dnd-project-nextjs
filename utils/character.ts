const abilityScoreM = (abilityScore: number): number =>
  Math.floor((abilityScore - 10) / 2)

const proficiencyBonus = (level: number): number => Math.ceil(1 + level * 0.25)

const initiative = (dexterity: number): number => abilityScoreM(dexterity)

const savingThrow = (
  klass: string,
  ability: string,
  abilityScoreModifier: number,
  proficiencyBonus: number,
  level: number,
): number => {
  const savingThrows = {
    strength: ['Barbarian', 'Fighter', 'Monk', 'Ranger'],
    dexterity: ['Bard', 'Monk', 'Ranger', 'Rogue'],
    constitution: ['Barbarian', 'Fighter', 'Sorcerer'],
    intelligence: ['Wizard', 'Druid', 'Rogue'],
    wisdom: ['Wizard', 'Cleric', 'Druid', 'Paladin', 'Warlock'],
    charisma: ['Bard', 'Cleric', 'Paladin', 'Sorcerer', 'Warlock'],
  }

  // Monks get Diamond Soul on level 14 (proficient in all saves)
  if (klass === 'Monk' && level >= 14) {
    return abilityScoreModifier + proficiencyBonus
  }

  // Rogues get proficient saving throws on level 15 in WIS
  if (klass === 'Rogue' && level >= 15 && ability === 'wisdom') {
    return abilityScoreModifier + proficiencyBonus
  }

  if (savingThrows[ability].includes(klass)) {
    return abilityScoreModifier + proficiencyBonus
  }

  return abilityScoreModifier
}

const passivePerception = (
  wisdomModifier: number,
  proficiencyBonus: number,
  isProficient: boolean,
): number =>
  isProficient ? 10 + wisdomModifier + proficiencyBonus : 10 + wisdomModifier

const passiveInvestigation = (
  intellligenceModifier: number,
  proficiencyBonus: number,
  isProficient: boolean,
): number =>
  isProficient
    ? 10 + intellligenceModifier + proficiencyBonus
    : 10 + intellligenceModifier

const passiveInsight = (
  wisdomModifier: number,
  proficiencyBonus: number,
  isProficient: boolean,
): number =>
  isProficient ? 10 + wisdomModifier + proficiencyBonus : 10 + wisdomModifier

const hitBonus = (proficiencyBonus: number, abilityModifier: number): number =>
  proficiencyBonus + abilityModifier

const sneakAttack = (level: number) => {
  if (level === 1) return 1
  return Math.ceil(level / 2)
}

const calculateSkill = (
  isProficient: boolean,
  abilityScoreModifier: number,
  proficiencyBonus: number,
): number => {
  if (isProficient) {
    return abilityScoreModifier + proficiencyBonus
  }

  return abilityScoreModifier
}

const spellHit = (
  abilityScoreModifier: number,
  proficiencyBonus: number,
): number => {
  return abilityScoreModifier + proficiencyBonus
}

const spellSaveDc = (
  abilityScoreModifier: number,
  proficiencyBonus: number,
): number => {
  return 8 + abilityScoreModifier + proficiencyBonus
}

const subclassTitle = {
  Barbarian: 'Primal Path',
  Bard: 'Bard College',
  Druid: 'Druid Circle',
  Cleric: 'Divine Domain',
  Monk: 'Monastic Tradition',
  Paladin: 'Sacred Oath',
  Fighter: 'Martial Archetype',
  Rogue: 'Roguish Archetype',
  Ranger: 'Ranger Conclave',
  Sorcerer: 'Sorcerous Origin',
  Warlock: 'Otherworldly Patron',
  Wizard: 'Arcane Tradition',
}

export {
  abilityScoreM,
  calculateSkill,
  hitBonus,
  initiative,
  passiveInsight,
  passiveInvestigation,
  passivePerception,
  proficiencyBonus,
  savingThrow,
  sneakAttack,
  spellHit,
  spellSaveDc,
  subclassTitle,
}
