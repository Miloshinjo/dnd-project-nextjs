import { Character } from '../../../../../../generated/graphql'

import StatField from '../../stat-field'
import ArmorClass from '../armor-class'
import Speed from '../speed'

import styles from './styles.module.css'

type Props = {
  proficiencyBonus: number
  initiative: number
  speed: Character['speed']
  characterId: Character['id']
  armorClass: Character['armorClass']
}

const BaseStats: React.FC<Props> = ({
  proficiencyBonus,
  initiative,
  speed,
  characterId,
  armorClass,
}) => {
  return (
    <div className={styles.container}>
      <StatField label="Prof." value={proficiencyBonus} />
      <StatField label="Initiative" value={initiative} />
      <Speed characterId={characterId} speed={speed} />
      <ArmorClass characterId={characterId} armorClass={armorClass} />
    </div>
  )
}

export { BaseStats as default }
