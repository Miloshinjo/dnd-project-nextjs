import { motion } from 'framer-motion'
import {
  GiBiceps,
  GiBodyBalance,
  GiBrain,
  GiTripleYin,
  GiDaggerRose,
  GiHeartWings,
} from 'react-icons/gi'

import {
  abilityScoreM,
  savingThrow,
  proficiencyBonus,
} from '../../../../../utils/character'
import { listVariants, itemVariants } from './animation'
import abilityScores from '../../../../../data/abilityScores'
import {
  useStrengthMutation,
  useDexterityMutation,
  useConstitutionMutation,
  useIntelligenceMutation,
  useWisdomMutation,
  useCharismaMutation,
} from '../../../../../generated/graphql'
import { AbilityScore } from '../../../../../models/abilityScore'
import { CharacterUI } from '../../../../../models/character'

import { useModal } from '../../../../../context/modal'
import styles from './styles.module.css'

const icons = {
  strength: <GiBiceps size={16} />,
  dexterity: <GiBodyBalance size={16} />,
  constitution: <GiHeartWings size={16} />,
  intelligence: <GiBrain size={16} />,
  wisdom: <GiTripleYin size={16} />,
  charisma: <GiDaggerRose size={16} />,
}

type Props = {
  character: CharacterUI
}

const mutations: Record<AbilityScore, Function> = {
  strength: useStrengthMutation,
  dexterity: useDexterityMutation,
  constitution: useConstitutionMutation,
  intelligence: useIntelligenceMutation,
  wisdom: useWisdomMutation,
  charisma: useCharismaMutation,
}

const AbilityScores: React.FC<Props> = ({ character }) => {
  const { openModal } = useModal()

  return (
    <>
      <h2 className="opacity-50 mb-1 font-semibold text-sm">Ability Scores</h2>
      <motion.div
        className={styles.abilityScores}
        variants={listVariants}
        animate="show"
        initial="hidden"
      >
        {abilityScores.map(
          (abilityScore: AbilityScore): JSX.Element => {
            return (
              <motion.button
                type="button"
                className={styles.abilityScoreContainer}
                key={abilityScore}
                variants={itemVariants}
                onClick={() =>
                  openModal({
                    type: 'number',
                    props: {
                      originalValue: character[abilityScore as AbilityScore],
                      characterId: character.id,
                      title: abilityScore,
                      type: abilityScore.toLowerCase(),
                      mutation: mutations[abilityScore],
                    },
                  })
                }
              >
                <div className={styles.abilityScoreIcon}>
                  {icons[abilityScore.toLowerCase()]}
                </div>
                <div className={styles.abilityScoreTitle}>{abilityScore}</div>
                <div className={styles.abilityScoreValue}>
                  {character[abilityScore as AbilityScore]}
                </div>
                <div className={styles.abilityScoreM}>
                  <span className={styles.miniLabel}>mod</span>
                  {abilityScoreM(character[abilityScore as AbilityScore])}
                </div>
                <div className={styles.abilityScoreSave}>
                  <span className={styles.miniLabel}>save</span>
                  {savingThrow(
                    character.klass.name,
                    abilityScore,
                    abilityScoreM(character[abilityScore]),
                    proficiencyBonus(character[abilityScore]),
                    character.level,
                  )}
                </div>
              </motion.button>
            )
          },
        )}
      </motion.div>
    </>
  )
}

export { AbilityScores as default }
