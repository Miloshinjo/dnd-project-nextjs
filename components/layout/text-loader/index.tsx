import { motion } from 'framer-motion'

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
    <div className="flex items-baseline text-primary-900">
      {text}
      <motion.div
        className="flex ml-2"
        variants={loadingContainerVariants}
        initial="start"
        animate="end"
      >
        <motion.span
          variants={loadingCircleVariants}
          className="w-1 h-1 block bg-primary-900 rounded-full mr-1"
        />
        <motion.span
          variants={loadingCircleVariants}
          className="w-1 h-1 block bg-primary-900 rounded-full mr-1"
        />
        <motion.span
          variants={loadingCircleVariants}
          className="w-1 h-1 block bg-primary-900 rounded-full"
        />
      </motion.div>
    </div>
  )
}

export { TextLoader as default }
