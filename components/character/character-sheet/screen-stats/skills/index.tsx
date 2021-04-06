import { motion } from 'framer-motion'

import {
  useAddSkillMutation,
  useRemoveSkillMutation,
  Skill,
} from '../../../../../generated/graphql'
import { CharacterModel } from '../../../../../models/character'

import {
  calculateSkill,
  proficiencyBonus,
  abilityScoreM,
} from '../../../../../utils/character'

import styles from './styles.module.css'

type Props = {
  skills: Array<Skill>
  character: CharacterModel
}

const Skills: React.FC<Props> = ({ skills, character }) => {
  const [
    { data: addSkillData, fetching: addSkillFetching },
    addSkill,
  ] = useAddSkillMutation()
  const [
    { data: removeSkillData, fetching: removeSkillFetching },
    removeSkill,
  ] = useRemoveSkillMutation()

  return (
    <div className={styles.container}>
      <h3 className="statSectionHeading mb-2">Skills</h3>

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
              if (isProficient) {
                removeSkill({ id: character.id, skillId: skill.id })
                return
              }
              addSkill({ id: character.id, skillId: skill.id })
            }}
            disabled={addSkillFetching || removeSkillFetching}
          >
            <div className={styles.infoWrapper}>
              <div
                className={`${styles.indicator} ${
                  isProficient ? styles.isProficient : ''
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
    </div>
  )
}

export { Skills as default }
