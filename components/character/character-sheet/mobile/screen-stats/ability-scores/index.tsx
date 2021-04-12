import { useModal } from '../../../../../../context/modal'
import abilityScores from '../../../../../../data/abilityScores'
import {
  useStrengthMutation,
  useDexterityMutation,
  useConstitutionMutation,
  useIntelligenceMutation,
  useWisdomMutation,
  useCharismaMutation,
  CharacterQuery,
} from '../../../../../../generated/graphql'
import { AbilityScoreType } from '../../../../../../models/abilityScore'
import {
  abilityScoreM,
  savingThrow,
  proficiencyBonus,
} from '../../../../../../utils/character'

import styles from './styles.module.css'

type Props = {
  character: CharacterQuery['character']
}

const mutations: Record<AbilityScoreType, any> = {
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
    <div className={styles.abilityScores}>
      <h3 className="statSectionHeading mb-4">Ability Scores</h3>

      {abilityScores.map(
        (abilityScore: AbilityScoreType): JSX.Element => {
          return (
            <button
              type="button"
              className={styles.abilityScoreContainer}
              key={abilityScore}
              onClick={() =>
                openModal({
                  type: 'number',
                  props: {
                    originalValue: character[abilityScore as AbilityScoreType],
                    characterId: character.id,
                    title: abilityScore,
                    type: abilityScore.toLowerCase(),
                    mutation: mutations[abilityScore],
                  },
                })
              }
            >
              <div className="w-1/2 flex justify-between mr-12 md:mr-32">
                <div className={styles.abilityScoreTitle}>{abilityScore}</div>
                <div className={styles.abilityScoreValue}>
                  {character[abilityScore as AbilityScoreType]}
                </div>
              </div>

              <div className="w-1/2 flex justify-end">
                <div className={styles.abilityScoreM}>
                  <span className={styles.miniLabel}>mod</span>
                  {abilityScoreM(character[abilityScore as AbilityScoreType])}
                </div>
                <div className={styles.abilityScoreSave}>
                  <span className={styles.miniLabel}>save</span>
                  {savingThrow(
                    character.klass.name,
                    abilityScore,
                    abilityScoreM(character[abilityScore]),
                    proficiencyBonus(character.level),
                    character.level,
                  )}
                </div>
              </div>
            </button>
          )
        },
      )}
    </div>
  )
}

export { AbilityScores as default }
