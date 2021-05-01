import styles from './styles.module.css'

type Props = {
  label: string
  value: any
  fullWidth?: boolean
}

const StatField: React.FC<Props> = ({ label, value, fullWidth = false }) => {
  return (
    <div className={`${styles.container} ${fullWidth ? styles.fullWidth : ''}`}>
      <span className={styles.label}>{label}</span>
      <span className={styles.value}>{value}</span>
    </div>
  )
}

export { StatField as default }
