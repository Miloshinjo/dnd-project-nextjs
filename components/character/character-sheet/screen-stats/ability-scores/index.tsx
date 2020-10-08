import {
  abilityScoreM,
  savingThrow,
  proficiencyBonus,
} from '../../../../../utils/character'
import abilityScores from '../../../../../data/abilityScores'
import {
  useStrengthMutation,
  useDexterityMutation,
  useConstitutionMutation,
  useIntelligenceMutation,
  useWisdomMutation,
  useCharismaMutation,
  Character,
} from '../../../../../generated/graphql'
import { AbilityScore } from '../../../../../models/abilityScore'

import { useModal } from '../../../../../context/modal'
import styles from './styles.module.css'

type Props = {
  character: Pick<
    Character,
    | 'id'
    | 'name'
    | 'armorClass'
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

const mutations: Record<AbilityScore, any> = {
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
      <div className={styles.abilityScores}>
        {abilityScores.map(
          (abilityScore: AbilityScore): JSX.Element => {
            return (
              <button
                type="button"
                className={styles.abilityScoreContainer}
                key={abilityScore}
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
                <div className="w-1/2 flex justify-between mr-12 md:mr-32">
                  <div className={styles.abilityScoreTitle}>{abilityScore}</div>
                  <div className={styles.abilityScoreValue}>
                    {character[abilityScore as AbilityScore]}
                  </div>
                </div>

                <div className="w-1/2 flex justify-end">
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
    </>
  )
}

export { AbilityScores as default }
