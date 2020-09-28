import Loader from '../../layout/loader'

import styles from './styles.module.css'

type Props = {
  text: string
  loading: boolean
}

const SubmitButton: React.FC<Props> = ({ loading, text }) => {
  return (
    <button type="submit" className={styles.button} disabled={loading}>
      <span className={styles.icon}></span>
      {loading ? <Loader color="light" size={15} /> : text}
    </button>
  )
}

export { SubmitButton as default }
