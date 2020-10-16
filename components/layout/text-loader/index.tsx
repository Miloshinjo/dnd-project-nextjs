import { motion } from 'framer-motion'

import styles from './styles.module.css'

const loadingContainerVariants = {
  start: {
    transition: {
      staggerChildren: 0.1,
    },
  },
  end: {
    transition: {
      staggerChildren: 0.1,
    },
  },
}
const loadingCircleVariants = {
  start: {
    opacity: 0,
    transition: {
      duration: 0.5,
      yoyo: Infinity,
      ease: 'easeInOut',
    },
  },
  end: {
    opacity: 1,
    transition: {
      duration: 0.5,
      yoyo: Infinity,
      ease: 'easeInOut',
    },
  },
}

type Props = {
  text: string
}

const TextLoader: React.FC<Props> = ({ text }) => {
  return (
    <div className={styles.container}>
      {text}
      <motion.div
        className={styles.loaderContainer}
        variants={loadingContainerVariants}
        initial="start"
        animate="end"
      >
        <motion.span
          variants={loadingCircleVariants}
          className={`${styles.loaderCircle} mr-1`}
        />
        <motion.span
          variants={loadingCircleVariants}
          className={`${styles.loaderCircle} mr-1`}
        />
        <motion.span
          variants={loadingCircleVariants}
          className={styles.loaderCircle}
        />
      </motion.div>
    </div>
  )
}

export { TextLoader as default }
