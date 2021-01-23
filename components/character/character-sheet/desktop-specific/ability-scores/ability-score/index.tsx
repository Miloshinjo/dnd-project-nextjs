import styles from './styles.module.css'

type Props = {
  abilityScore: string
  value: number
}

const AbilityScore: React.FC<Props> = ({ abilityScore, value }) => {
  return (
    <div className={styles.abilityScoreContainer}>
      <div className={styles.abilityScoreTitle}>
        {abilityScore.substring(0, 3)}
      </div>
      <div className={styles.stat}>{value}</div>
    </div>
  )
}

export default AbilityScore
