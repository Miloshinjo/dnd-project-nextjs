import Link from 'next/link'
import ModalHeader from '../../modal/modal-header'

import styles from './styles.module.css'

const CharacterCreated = ({ characterId, name, race, klass }) => {
  return (
    <>
      <ModalHeader type="" title="Character Created!" />
      <div className={styles.container}>
        <div className={styles.name}>{name}</div>
        <div className={styles.raceKlass}>
          {race} {klass}
        </div>
        <div className={styles.links}>
          <Link href={`/app/${characterId}`}>
            <a className={styles.spellLearntLink}>Character sheet</a>
          </Link>
          <Link href={`/app`}>
            <a className={styles.spellLearntLinkFlat}>Back to home</a>
          </Link>
        </div>
      </div>
    </>
  )
}

export { CharacterCreated as default }
