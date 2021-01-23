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
import { AbilityScoreType } from '../../../../../models/abilityScore'
import {
  abilityScoreM,
  savingThrow,
  proficiencyBonus,
} from '../../../../../utils/character'

import AbilityScore from './ability-score'

import styles from './styles.module.css'

const mutations: Record<AbilityScoreType, any> = {
  strength: useStrengthMutation,
  dexterity: useDexterityMutation,
  constitution: useConstitutionMutation,
  intelligence: useIntelligenceMutation,
  wisdom: useWisdomMutation,
  charisma: useCharismaMutation,
}

type Props = {
  character: any
}

const AbilityScoresDesktop: React.FC<Props> = ({ character }) => {
  return (
    <div className={styles.container}>
      {abilityScores.map(
        (abilityScore: AbilityScoreType): JSX.Element => {
          return (
            <AbilityScore
              key={abilityScore}
              abilityScore={abilityScore}
              value={character[abilityScore]}
            />
          )
        },
      )}
    </div>
  )
}

export default AbilityScoresDesktop
