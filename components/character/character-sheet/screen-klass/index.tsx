import { motion } from 'framer-motion'
import Sorcerer from './sorcerer'
import Cleric from './cleric'
import Druid from './druid'
import Bard from './bard'
import Paladin from './paladin'
import Warlock from './warlock'
import Wizard from './wizard'
import Ranger from './ranger'
import Rogue from './rogue'
import Monk from './monk'
import Fighter from './fighter'
import Barbarian from './barbarian'
import styles from './styles.module.css'

const screenVariants = {
  initial: { x: '100vw' },
  animate: {
    x: '0',
    transition: { duration: 0.3, ease: 'easeIn' },
  },
}

const klassToRender = {
  Barbarian: <Barbarian />,
  Bard: <Bard />,
  Cleric: <Cleric />,
  Druid: <Druid />,
  Fighter: <Fighter />,
  Monk: <Monk />,
  Paladin: <Paladin />,
  Ranger: <Ranger />,
  Rogue: <Rogue />,
  Sorcerer: <Sorcerer />,
  Warlock: <Warlock />,
  Wizard: <Wizard />,
}

type Props = {
  character: any
}

const ScreenKlass: React.FC<Props> = ({ character }) => {
  return (
    <motion.div
      variants={screenVariants}
      animate="animate"
      initial="initial"
      className={styles.container}
    >
      {klassToRender[character.klass.name]}
    </motion.div>
  )
}

export { ScreenKlass as default }
