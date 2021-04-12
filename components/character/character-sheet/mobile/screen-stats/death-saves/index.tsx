import Checkbox from './checkbox'

import styles from './styles.module.css'

const DeathSaves: React.FC = () => {
  return (
    <div className={styles.container}>
      <h2 className={styles.heading}>Death Saves</h2>

      <div className={styles.saveCountersContainer}>
        <div className={styles.saveCounterContainer}>
          <h3 className={styles.saveCounterTitle}>Success</h3>
          <div className={styles.saveCounts}>
            <Checkbox type="success" />
            <Checkbox type="success" />
            <Checkbox type="success" />
          </div>
        </div>
        <div className={styles.saveCounterContainer}>
          <h3 className={styles.saveCounterTitle}>Failed</h3>
          <div className={styles.saveCounts}>
            <Checkbox type="fail" />
            <Checkbox type="fail" />
            <Checkbox type="fail" />
          </div>
        </div>
      </div>
    </div>
  )
}

export { DeathSaves as default }
