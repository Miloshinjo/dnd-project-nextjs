import { motion } from 'framer-motion'

import useBigScreen from '../../../../../hooks/useBigScreen'
import { ActiveCharacterScreen } from '../../../../../models/misc'

import icons from './icons'
import { navItems } from './navItems'
import styles from './styles.module.css'

type Props = {
  activeKey: ActiveCharacterScreen
  setActiveKeyAndStore: (key: ActiveCharacterScreen) => void
  isSpellcaster: boolean
  klassName: string
}

const buttonVariants = {
  inactive: {
    scale: 1,
    transition: {
      type: 'tween',
      duration: 0.2,
    },
  },
  active: {
    scale: [1, 1.1, 1],
    transition: {
      type: 'tween',
      duration: 0.4,
    },
  },
}

const Nav: React.FC<Props> = ({
  activeKey,
  setActiveKeyAndStore,
  isSpellcaster,
  klassName,
}) => {
  const isBigScreen = useBigScreen()
  return (
    <div className={styles.container}>
      {navItems.map((item) => {
        const isActive = activeKey === item.key

        if (!isSpellcaster && item.key === 'spells') {
          return null
        }

        if (item.key === 'class') {
          item.icon = icons[klassName]
          item.text = klassName
        }

        return isBigScreen ? (
          <button
            key={item.text}
            onClick={() => {
              setActiveKeyAndStore(item.key)
            }}
            style={{
              color: isActive ? `var(--color-text)` : '',
              opacity: isActive ? 1 : 0.5,
            }}
            className={styles.navLink}
          >
            {item.text}
          </button>
        ) : (
          <motion.button
            className={styles.navLink}
            style={{
              color: isActive ? `var(--color-${klassName})` : '',
              opacity: isActive ? 1 : 0.5,
            }}
            key={item.text}
            onClick={() => {
              setActiveKeyAndStore(item.key)
            }}
            initial={false}
            variants={buttonVariants}
            animate={isActive ? 'active' : 'inactive'}
          >
            <div className={styles.navLinkIcon}>{item.icon}</div>
            <div className={styles.navLinkText}>{item.text}</div>
          </motion.button>
        )
      })}
    </div>
  )
}

export { Nav as default }
function useIsBigScreen() {
  throw new Error('Function not implemented.')
}
