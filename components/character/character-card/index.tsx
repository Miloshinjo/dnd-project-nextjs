import { motion } from 'framer-motion'
import Link from 'next/link'
import { FiChevronRight } from 'react-icons/fi'

import { Character, Klass } from '../../../generated/graphql'

import styles from './styles.module.css'

type Props = {
  id: Character['id']
  itemVariants: Record<any, any>
  klass: Klass['name']
  name: Character['name']
  race: Character['race']
}

const CharacterCard: React.FC<Props> = ({
  id,
  race,
  klass,
  name,
  itemVariants,
}) => {
  return (
    <Link href={`/app/${id}`} key={id}>
      <motion.div
        className={styles.container}
        variants={itemVariants}
        whileHover={{ y: '-1px' }}
        whileTap={{ y: '1px' }}
      >
        <div className={styles.klassLogoContainer}>
          <img src={`/images/classes/${klass.toLowerCase()}.png`} alt={klass} />
        </div>
        <div className={styles.infoContainer}>
          <div className={styles.name}>{name}</div>
          <div className={styles.raceKlass}>
            {race} {klass}
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
