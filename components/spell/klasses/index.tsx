import styles from './styles.module.css'

type Props = {
  klasses: string
}

const Klasses: React.FC<Props> = ({ klasses }) => (
  <div className={styles.container}>
    {klasses.split(',').map((klass) => {
      return (
        <div key={klass} className={styles.klass}>
          {klass}
        </div>
      )
    })}
  </div>
)

export { Klasses as default }
