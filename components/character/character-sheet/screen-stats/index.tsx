import { useCallback } from 'react'
import { motion } from 'framer-motion'

import AbilityScores from './ability-scores'
import { Character } from '../../../../generated/graphql'
import {
  proficiencyBonus,
  initiative,
  sneakAttack,
  passivePerception,
  passiveInvestigation,
  passiveInsight,
  abilityScoreM,
  hitBonus,
} from '../../../../utils/character'
import ArmorClass from '../screen-stats/armor-class'
import Speed from '../screen-stats/speed'
import StatField from '../common/stat-field'

import styles from './styles.module.css'

type Props = {
  character: Pick<
    Character,
    | 'id'
    | 'armorClass'
    | 'name'
    | 'level'
    | 'race'
    | 'klass'
    | 'hitPoints'
    | 'maxHitPoints'
    | 'arcaneWard'
    | 'arcaneWardMax'
    | 'alignment'
    | 'gold'
    | 'inspiration'
    | 'strength'
    | 'dexterity'
    | 'intelligence'
    | 'wisdom'
    | 'charisma'
    | 'constitution'
    | 'skills'
    | 'speed'
    | 'spellSlots'
    | 'subclass'
    | 'spells'
    | 'preparedSpells'
  >
}

const screenVariants = {
  initial: { x: '100vw' },
  animate: {
    x: '0',
    transition: { duration: 0.3, ease: 'easeIn' },
  },
}

const CharacterScreenStats: React.FC<Props> = ({ character }) => {
  const hasSkill = useCallback(
    (skillName) => {
      const skill = character.skills.find((skill) => skillName === skill.name)

      return Boolean(skill)
    },
    [character.skills],
  )

  return (
    <motion.div
      variants={screenVariants}
      animate="animate"
      initial="initial"
      className="p-6"
    >
      <div className={styles.header}>
        <StatField label="Prof." value={proficiencyBonus(character.level)} />
        <StatField label="Initiative" value={initiative(character.dexterity)} />
        <Speed characterId={character.id} speed={character.speed} />
        <ArmorClass
          characterId={character.id}
          armorClass={character.armorClass}
        />
      </div>

      <AbilityScores character={character} />

      <div className="mt-6 md:flex md:justify-between">
        <div className="mb-4 md:w-1/2 md:mr-16">
          <h2 className="opacity-50 mb-1 font-semibold text-sm">
            Attack (Hit)
          </h2>
          <StatField
            label="Strength"
            value={hitBonus(
              abilityScoreM(character.strength),
              proficiencyBonus(character.level),
            )}
            fullWidth
          />
          <StatField
            label="Dexterity"
            value={hitBonus(
              abilityScoreM(character.dexterity),
              proficiencyBonus(character.level),
            )}
            fullWidth
          />
          {character.klass.name === 'Rogue' && (
            <StatField
              label="Sneak Attack"
              value={`${sneakAttack(character.level)}d6`}
              fullWidth
            />
          )}
        </div>
        <div className="mb-4 md:w-1/2">
          <h2 className="opacity-50 mb-1 font-semibold text-sm">Senses</h2>
          <StatField
            label="Passive perception"
            value={passivePerception(
              abilityScoreM(character.wisdom),
              proficiencyBonus(character.level),
              hasSkill('Perception'),
            )}
            fullWidth
          />
          <StatField
            label="Passive investigation"
            value={passiveInvestigation(
              abilityScoreM(character.intelligence),
              proficiencyBonus(character.level),
              hasSkill('Investigation'),
            )}
            fullWidth
          />
          <StatField
            label="Passive insight"
            value={passiveInsight(
              abilityScoreM(character.wisdom),
              proficiencyBonus(character.level),
              hasSkill('Insight'),
            )}
            fullWidth
          />
        </div>
      </div>
    </motion.div>
  )
}

export { CharacterScreenStats as default }
