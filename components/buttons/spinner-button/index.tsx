import { memo } from 'react'
import styles from './styles.module.css'

const SpinnerButton = ({ onClick, fetching, text, textFetching }) => {
  return (
    <button
      className={`${styles.button} ${fetching ? styles.buttonActive : ''}`}
      onClick={onClick}
      disabled={fetching}
    >
      <div className={styles.text}>{fetching ? textFetching : text}</div>
      <div className={styles.loader}></div>
    </button>
  )
}

export default memo(SpinnerButton)
