import styles from './styles.module.css'

type Props = {
  concentration: boolean
  ritual: boolean
}

const ConcentrationRitual: React.FC<Props> = ({ concentration, ritual }) => {
  if (!concentration && !ritual) return null
  return (
    <div className={styles.container}>
      {concentration && <div className={styles.badge}>Concentration</div>}
      {ritual && <div className={styles.badge}>Ritual</div>}
    </div>
  )
}

export { ConcentrationRitual as default }
