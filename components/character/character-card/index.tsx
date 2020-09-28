import Link from 'next/link'
import { motion } from 'framer-motion'
import { CharacterUI } from '../../../models/character'
import { FiChevronRight } from 'react-icons/fi'

import styles from './styles.module.css'

type Props = {
  character: CharacterUI
  itemVariants: Record<any, any>
}

const CharacterCard: React.FC<Props> = ({ character, itemVariants }) => {
  return (
    <Link
      href="/app/[characterId]"
      as={`/app/${character.id}`}
      key={character.id}
    >
      <motion.div
        className={styles.container}
        variants={itemVariants}
        whileHover={{ y: '-1px' }}
        whileTap={{ y: '1px' }}
      >
        <div className={styles.klassLogoContainer}>
          <img
            src={`/images/classes/${character.klass.name.toLowerCase()}.png`}
            alt={character.klass.name}
          />
        </div>
        <div className={styles.levelContainer}>
          <span className={styles.levelValue}>{character.level}</span>
          <span className={styles.levelLabel}>LVL</span>
        </div>
        <div className={styles.infoContainer}>
          <div className={styles.name}>{character.name}</div>
          <div className={styles.raceKlass}>
            {character.race} {character.klass.name}
          </div>
        </div>
        <div className="ml-auto">
          <FiChevronRight size={40} className="ml-auto" />
        </div>
      </motion.div>
    </Link>
  )
}

export { CharacterCard as default }
