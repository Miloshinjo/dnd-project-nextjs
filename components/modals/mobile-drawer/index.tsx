import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { signOut, useSession } from 'next-auth/client'
import { FiLogOut } from 'react-icons/fi'
import { GoHome } from 'react-icons/go'
import { GiMagicSwirl } from 'react-icons/gi'

import ThemeSwitchButton from '../../buttons/theme-switch'
import DrawerHeader from '../../modal/drawer-header'

import styles from './styles.module.css'

const DrawerMenu: React.FC = () => {
  const router = useRouter()

  const [session] = useSession()

  const email = session?.user?.email
  const name = session?.user?.name
  const image = session?.user?.image

  const [src, setSrc] = useState(image)

  const removeSrc = () => {
    setSrc(null)
  }

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
            <GoHome size={20} />
            <span>Home</span>
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
      <div className={styles.userProfile}>
        <div className={styles.avatarContainer}>
          {src ? (
            <img
              src={src}
              onError={removeSrc}
              alt="profile image"
              className={styles.avatarImage}
            />
          ) : (
            <div className={styles.emptyAvatar}>{name.substring(0, 2)}</div>
          )}
        </div>
        <div className={styles.userInfoContainer}>
          <div className={styles.username}>{name}</div>
          <div className={styles.email}>{email}</div>
        </div>
      </div>

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
