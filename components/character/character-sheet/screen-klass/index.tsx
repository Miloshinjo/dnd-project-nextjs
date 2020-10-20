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
import StatField from '../common/stat-field'

import styles from './styles.module.css'

const screenVariants = {
  initial: { x: '100vw' },
  animate: {
    x: '0',
    transition: { duration: 0.3, ease: 'easeIn' },
  },
}

const klassToRender = ({ characterId, klassAbilityOne }) => ({
  Barbarian: (
    <Barbarian characterId={characterId} klassAbilityOne={klassAbilityOne} />
  ),
  Bard: <Bard characterId={characterId} klassAbilityOne={klassAbilityOne} />,
  Cleric: (
    <Cleric characterId={characterId} klassAbilityOne={klassAbilityOne} />
  ),
  Druid: <Druid characterId={characterId} klassAbilityOne={klassAbilityOne} />,
  Fighter: (
    <Fighter characterId={characterId} klassAbilityOne={klassAbilityOne} />
  ),
  Monk: <Monk characterId={characterId} klassAbilityOne={klassAbilityOne} />,
  Paladin: (
    <Paladin characterId={characterId} klassAbilityOne={klassAbilityOne} />
  ),
  Ranger: <Ranger characterId={characterId} />,
  Rogue: <Rogue characterId={characterId} />,
  Sorcerer: (
    <Sorcerer characterId={characterId} klassAbilityOne={klassAbilityOne} />
  ),
  Warlock: <Warlock characterId={characterId} />,
  Wizard: <Wizard characterId={characterId} />,
})

type Props = {
  character: any
}

const ScreenKlass: React.FC<Props> = ({ character }) => {
  return (
    <motion.div variants={screenVariants} animate="animate" initial="initial">
      <div className={styles.section}>
        <StatField label="Hit Die" value={character.klass.hitDie} />
      </div>
      {
        klassToRender({
          characterId: character.id,
          klassAbilityOne: character.klassAbilityOne,
        })[character.klass.name]
      }
    </motion.div>
  )
}

export { ScreenKlass as default }
