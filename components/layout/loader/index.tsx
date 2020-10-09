import styles from './styles.module.css'

type Props = {
  color?: 'dark' | 'light'
  size?: number
}

const Loader: React.FC<Props> = ({ color = 'dark', size = 24 }) => {
  return <div className={styles.loader}></div>
}

export { Loader as default }
