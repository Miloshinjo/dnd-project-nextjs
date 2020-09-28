import styles from './styles.module.css'

type Props = {
  disabled?: boolean
  onClick: () => void
}

const AddButton: React.FC<Props> = ({ disabled, onClick, children }) => {
  return (
    <button
      type="button"
      className={`${styles.addButton} ${disabled && styles.disabled}`}
      disabled={disabled}
      onClick={onClick}
    >
      {children}
    </button>
  )
}

export { AddButton as default }
