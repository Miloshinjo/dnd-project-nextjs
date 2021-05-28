import StatField from '../stat-field'

import styles from './styles.module.css'

type Props = {
  hitStrength: number
  sneakAttack: string
  hitDexterity: number
}

const Attack: React.FC<Props> = ({
  hitStrength,
  hitDexterity,
  sneakAttack,
}) => {
  return (
    <div className={styles.container}>
      <h3 className="statSectionHeading mb-2">Attack</h3>
      <StatField label="Strength" value={hitStrength} fullWidth />
      <StatField label="Dexterity" value={hitDexterity} fullWidth />
      {sneakAttack && (
        <StatField label="Sneak Attack" value={sneakAttack} fullWidth />
      )}
    </div>
  )
}

export { Attack as default }
