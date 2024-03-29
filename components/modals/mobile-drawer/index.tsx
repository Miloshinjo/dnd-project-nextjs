import Link from 'next/link'
import { useRouter } from 'next/router'
import { FiLogOut } from 'react-icons/fi'
import { GiMagicSwirl } from 'react-icons/gi'

import { IoIosPeople } from 'react-icons/io'

import { signOut } from '../../../lib/next-auth/client'

import ThemeSwitchButton from '../../buttons/theme-switch'
import UserProfile from '../../layout/user-profile'
import DrawerHeader from '../../modal/drawer-header'

import styles from './styles.module.css'

const DrawerMenu: React.FC = () => {
  const router = useRouter()

  return (
    <div className={styles.drawer}>
      <DrawerHeader logoVisible />
      <nav className={styles.nav}>
        <Link href="/app">
          <a
            className={`${styles.link} ${
              router.pathname === '/app' ? styles.activeLink : ''
            }`}
          >
            <IoIosPeople size={20} />
            <span>Characters</span>
          </a>
        </Link>
        <Link href="/spells">
          <a
            className={`${styles.link} ${
              router.pathname === '/spells' ? styles.activeLink : ''
            }`}
          >
            <GiMagicSwirl size={20} />
            <span>Spells</span>
          </a>
        </Link>
      </nav>
      <ThemeSwitchButton />
      <div className={styles.border} />
      <UserProfile />

      <button
        className={styles.link}
        onClick={() => {
          signOut({
            callbackUrl:
              process.env.NODE_ENV === 'production'
                ? 'https://simulacrum.rocks/'
                : 'http://localhost:3000/',
          })
        }}
      >
        <FiLogOut size={20} />
        <span>Sign out</span>
      </button>
    </div>
  )
}

export { DrawerMenu as default }
