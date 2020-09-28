import { motion } from 'framer-motion'

import { GiFireSpellCast } from 'react-icons/gi'
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
    icon: <GiFireSpellCast size={28} />,
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

const iconVariants = {
  active: {
    scale: 0.5,
    color: '#1a202c',
    originY: 0,
    transition: {
      type: 'tween',
      duration: 0.5,
    },
  },
  inactive: {
    color: '#CBD5E0',
    scale: 1,
    transition: {
      type: 'tween',
      duration: 0.5,
    },
  },
}

const textVariants = {
  inactive: {
    opacity: 0,
    y: -10,
    transition: {
      type: 'tween',
      duration: 0.2,
    },
  },
  active: {
    opacity: 1,
    y: 0,
    transition: {
      type: 'tween',
      duration: 0.4,
    },
  },
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
            className={`${styles.navLink} ${
              isActive ? styles.navLinkActive : ''
            }`}
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
