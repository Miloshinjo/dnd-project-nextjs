import styles from './styles.module.css'

const SubHeaderDesktop: React.FC = ({ children }) => {
  return (
    <div className={styles.container}>
      <h1 className={styles.heading}>{children}</h1>
    </div>
  )
}

export { SubHeaderDesktop as default }
