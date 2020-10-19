import { motion } from 'framer-motion'

import { GiMagicSwirl } from 'react-icons/gi'
import { HiAdjustments } from 'react-icons/hi'
import { BsTriangle } from 'react-icons/bs'
import { BiStats } from 'react-icons/bi'

import { ActiveKey } from '../../../../models/misc'
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
    text: 'Skills',
    key: 'skills',
  },
  {
    icon: <GiMagicSwirl size={28} />,
    text: 'Spells',
    key: 'spells',
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
  klass: string
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
  klass,
}) => {
  return (
    <div className={styles.container}>
      {navItems.map((item, index) => {
        const isActive = activeKey === item.key

        if (!isSpellcaster && item.key === 'spells') {
          return null
        }

        return (
          <motion.button
            className={styles.navLink}
            style={{
              color: isActive ? `var(--color-${klass})` : '',
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
