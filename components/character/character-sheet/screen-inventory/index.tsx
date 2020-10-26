import { motion } from 'framer-motion'

import MagicItems from './magic-items'

import styles from './styles.module.css'

const screenVariants = {
  initial: { x: '100vw' },
  animate: {
    x: '0',
    transition: { duration: 0.3, ease: 'easeIn' },
  },
}

const ScreenInventory = ({ characterId, magicItems }) => {
  return (
    <motion.div variants={screenVariants} animate="animate" initial="initial">
      <MagicItems magicItems={magicItems} characterId={characterId} />
    </motion.div>
  )
}

export { ScreenInventory as default }
