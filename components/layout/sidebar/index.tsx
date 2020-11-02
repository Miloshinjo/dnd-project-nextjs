import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { GiMagicSwirl } from 'react-icons/gi'
import { IoIosPeople } from 'react-icons/io'

import ThemeSwitch from '../../buttons/theme-switch'

import UserProfile from '../user-profile'

import styles from './styles.module.css'

const Sidebar: React.FC = () => {
  const router = useRouter()
  return (
    <div className={styles.container}>
      <div className={styles.logoContainer}>
        <Image
          src="/images/logo_single.png"
          alt="Logo"
          width={70}
          height={50}
        />
      </div>
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
      <ThemeSwitch color="same" />
      <UserProfile />
    </div>
  )
}

export { Sidebar as default }
