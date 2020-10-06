import { CharacterUI } from '../../../../models/character'

import { motion } from 'framer-motion'

import {
  useSkillsQuery,
  useSkillMutation,
  Skill,
} from '../../../../generated/graphql'
import {
  calculateSkill,
  abilityScoreM,
  proficiencyBonus,
} from '../../../../utils/character'

import styles from './styles.module.css'

const screenVariants = {
  initial: { x: '100vw' },
  animate: {
    x: '0',
    transition: { duration: 0.3, ease: 'easeIn' },
  },
}

type Props = {
  character: CharacterUI
  skills: Array<Skill>
}

const ScreenSkills: React.FC<Props> = ({ character, skills }) => {
  const [skillMutationResult, toggleSkill] = useSkillMutation()

  return (
    <motion.div
      variants={screenVariants}
      animate="animate"
      initial="initial"
      className={styles.container}
    >
      {skills.map((skill) => {
        const isProficient = !!character.skills.find((el) => el.id === skill.id)

        return (
          <motion.button
            key={skill.id}
            className={
              isProficient
                ? styles.skillContainerProficient
                : styles.skillContainer
            }
            type="button"
            onClick={() => {
              toggleSkill({ id: character.id, skillId: skill.id })
            }}
            disabled={skillMutationResult.fetching}
          >
            <div className={styles.infoWrapper}>
              <div
                className={`w-2 h-2 rounded-full border-primary-900 border mr-2 ${
                  isProficient ? 'bg-primary-900 ' : ''
                }`}
                style={{ marginTop: '1px' }}
              ></div>

              <div className={styles.name}>{skill.name}</div>
              <div className={styles.ability}>
                {skill.ability.substring(0, 3)}
              </div>
            </div>
            <div className={styles.value}>
              {calculateSkill(
                isProficient,
                abilityScoreM(character[skill.ability]),
                proficiencyBonus(character.level),
              )}
            </div>
          </motion.button>
        )
      })}
    </motion.div>
  )
}

export { ScreenSkills as default }
