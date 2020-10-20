import { useCallback } from 'react'
import { motion } from 'framer-motion'

import AbilityScores from './ability-scores'
import Skills from './skills'
import { Skill } from '../../../../generated/graphql'
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
import { CharacterModel } from '../../../../models/character'
import ArmorClass from '../screen-stats/armor-class'
import Speed from '../screen-stats/speed'
import StatField from '../common/stat-field'

import styles from './styles.module.css'

type Props = {
  skills: Array<Skill>
  character: CharacterModel
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

      <div className="mt-6">
        <div className="mb-4 ">
          <h2 className="opacity-50 mb-1 font-semibold text-sm">Attack</h2>
          <div className={styles.statBlockWrapper}>
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
          <h2 className="opacity-50 mb-1 font-semibold text-sm">Skills</h2>
          <Skills character={character} skills={skills} />
        </div>
        <div className="mb-4">
          <h2 className="opacity-50 mb-1 font-semibold text-sm">Senses</h2>
          <div className={styles.statBlockWrapper}>
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
