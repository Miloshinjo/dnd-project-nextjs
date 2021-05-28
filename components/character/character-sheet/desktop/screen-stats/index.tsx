import { CharacterQuery, SkillsQuery } from '../../../../../generated/graphql'
import {
  abilityScoreM,
  hitBonus,
  initiative,
  proficiencyBonus,
  sneakAttack,
} from '../../../../../utils/character'

import AbilityScores from '../../common/stats/ability-scores'
import Attack from '../../common/stats/attack'
import BaseStats from '../../common/stats/base-stats'
import Skills from '../../common/stats/skills'

import styles from './styles.module.css'

type Props = {
  character: CharacterQuery['character']
  skills: SkillsQuery['skills']
}

const ScreenStats: React.FC<Props> = ({ character, skills }) => {
  return (
    <div className={styles.container}>
      <div>
        <BaseStats
          proficiencyBonus={proficiencyBonus(character.level)}
          initiative={initiative(character.dexterity)}
          speed={character.speed}
          characterId={character.id}
          armorClass={character.armorClass}
        />
        <AbilityScores character={character} />
        <Attack
          hitStrength={hitBonus(
            abilityScoreM(character.strength),
            proficiencyBonus(character.level),
          )}
          hitDexterity={hitBonus(
            abilityScoreM(character.dexterity),
            proficiencyBonus(character.level),
          )}
          sneakAttack={
            character.klass.name === 'Rogue'
              ? `${sneakAttack(character.level)}d6`
              : null
          }
        />
      </div>
      <div>
        <Skills character={character} skills={skills} />
      </div>
    </div>
  )
}

export { ScreenStats as default }
