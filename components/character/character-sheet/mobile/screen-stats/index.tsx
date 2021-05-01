import { motion } from 'framer-motion'
import { useCallback } from 'react'

import { CharacterQuery, Skill } from '../../../../../generated/graphql'

import {
  proficiencyBonus,
  initiative,
  sneakAttack,
  passivePerception,
  passiveInvestigation,
  passiveInsight,
  abilityScoreM,
  hitBonus,
} from '../../../../../utils/character'
import AbilityScores from '../../common/ability-scores'
import StatField from '../../common/stat-field'

import BaseStats from '../../common/stats/base-stats'

import Skills from './skills'

import styles from './styles.module.css'

type Props = {
  skills: Array<Skill>
  character: CharacterQuery['character']
}

const screenVariants = {
  initial: { x: '100vw' },
  animate: {
    x: '0',
    transition: { duration: 0.3, ease: 'easeIn' },
  },
}

const CharacterScreenStats: React.FC<Props> = ({ character, skills }) => {
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
      className="p-4"
    >
      <BaseStats
        proficiencyBonus={proficiencyBonus(character.level)}
        initiative={initiative(character.dexterity)}
        speed={character.speed}
        characterId={character.id}
        armorClass={character.armorClass}
      />

      <AbilityScores character={character} />

      <div className="mt-6">
        <div className="mb-4">
          <div className={styles.statBlockWrapper}>
            <h3 className="statSectionHeading mb-2">Attack</h3>
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
        </div>
        <div className="mb-4">
          <Skills character={character} skills={skills} />
        </div>
        <div className="mb-4">
          <div className={styles.statBlockWrapper}>
            <h3 className="statSectionHeading mb-2">Senses</h3>
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
      </div>
    </motion.div>
  )
}

export { CharacterScreenStats as default }
