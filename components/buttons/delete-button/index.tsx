import styles from './styles.module.css'

type Props = {
  disabled?: boolean
  onClick: () => void
}

const DeleteButton: React.FC<Props> = ({ disabled, onClick, children }) => {
  return (
    <button
      type="button"
      className={`${styles.deleteButton} ${disabled && styles.disabled}`}
      disabled={disabled}
      onClick={onClick}
    >
      {children}
    </button>
  )
}

export { DeleteButton as default }
