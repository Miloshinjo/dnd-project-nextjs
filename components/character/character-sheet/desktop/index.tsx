import { CharacterQuery, SkillsQuery } from '../../../../generated/graphql'
import { initiative, proficiencyBonus } from '../../../../utils/character'

import AbilityScores from '../common/stats/ability-scores'
import BaseStats from '../common/stats/base-stats'

import styles from './styles.module.css'

type Props = {
  character: CharacterQuery['character']
  skills: SkillsQuery['skills']
}

const SheetDesktop: React.FC<Props> = ({ character, skills }) => {
  return (
    <div className={styles.container}>
      <BaseStats
        proficiencyBonus={proficiencyBonus(character.level)}
        initiative={initiative(character.dexterity)}
        speed={character.speed}
        characterId={character.id}
        armorClass={character.armorClass}
      />

      <AbilityScores character={character} />
    </div>
  )
}

export { SheetDesktop as default }
