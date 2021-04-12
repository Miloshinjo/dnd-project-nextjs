import { motion } from 'framer-motion'

import { BiStats } from 'react-icons/bi'
import { BsTriangle } from 'react-icons/bs'
import { GiMagicSwirl, GiSwapBag } from 'react-icons/gi'
import { HiAdjustments } from 'react-icons/hi'

import { ActiveKey } from '../../../../../models/misc'

import icons from './icons'
import styles from './styles.module.css'

type NavItem = {
  icon: JSX.Element
  text: string
  key: ActiveKey
}

const navItems: NavItem[] = [
  {
    icon: <BiStats size={28} />,
    text: 'Stats',
    key: 'stats',
  },
  {
    icon: <BsTriangle size={28} />,
    text: 'Class',
    key: 'class',
  },
  {
    icon: <GiMagicSwirl size={28} />,
    text: 'Spells',
    key: 'spells',
  },
  {
    icon: <GiSwapBag size={28} />,
    text: 'Inventory',
    key: 'inventory',
  },
  {
    icon: <HiAdjustments size={28} />,
    text: 'Settings',
    key: 'settings',
  },
]

type Props = {
  activeKey: ActiveKey
  setActiveKeyAndStore: (key: ActiveKey) => void
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

        return (
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
