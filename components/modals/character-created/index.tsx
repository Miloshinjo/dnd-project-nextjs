import Link from 'next/link'
import styles from './styles.module.css'

const CharacterCreated = ({ characterId, name, race, klass }) => {
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Character Created!</h1>
      <div className={styles.name}>{name}</div>
      <div className={styles.raceKlass}>
        {race} {klass}
      </div>
      <div className={styles.links}>
        <Link href={`/app/${characterId}`}>
          <a className={styles.spellLearntLink}>Go to character</a>
        </Link>
        <Link href={`/app`}>
          <a className={styles.spellLearntLinkFlat}>Back to home</a>
        </Link>
      </div>
    </div>
  )
}

export { CharacterCreated as default }
