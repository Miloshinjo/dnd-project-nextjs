import styles from './styles.module.css'

type Props = {
  text1: string
}

const SubHeader: React.FC<Props> = ({ children, text1 }) => {
  return (
    <div className={styles.container}>
      <h1 className={styles.heading}>
        {text1} <br />
        {children}
      </h1>
    </div>
  )
}

export { SubHeader as default }
