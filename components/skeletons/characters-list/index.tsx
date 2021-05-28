import { motion, Repeat } from 'framer-motion'

import styles from './styles.module.css'

const barVariants = {
  animation: {
    x: [-25, 125],
    transition: {
      duration: 1,
      repeat: Infinity,
      ease: [0.2, 0.7, 0.3, 1],
    },
  },
}

const CharacterListSkeletonCard = () => {
  return (
    <div className={styles.card}>
      <div className={styles.circle} />
      <div>
        <div className={styles.nameBar}>
          <motion.div
            className={styles.animatedBar}
            variants={barVariants}
            animate="animation"
          />
        </div>
        <div className={styles.klassBar}>
          <motion.div
            className={styles.animatedBar}
            variants={barVariants}
            animate="animation"
          />
        </div>
      </div>
    </div>
  )
}

const CharactersListSkeleton: React.FC = () => {
  return (
    <div className={styles.container}>
      <CharacterListSkeletonCard />
      <CharacterListSkeletonCard />
      <CharacterListSkeletonCard />
      <CharacterListSkeletonCard />
    </div>
  )
}

export { CharactersListSkeleton as default }
