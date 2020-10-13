import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { signOut, useSession } from 'next-auth/client'
import { useTheme } from 'next-themes'

import styles from './styles.module.css'

const DrawerMenu: React.FC = () => {
  const { theme, setTheme } = useTheme()

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
        <div className={styles.username}>{name || email}</div>
      </div>
      <nav className="w-full">
        <Link href="/app">
          <a
            className={`${styles.link} ${
              router.pathname === '/app' ? styles.activeLink : ''
            }`}
          >
            Home
          </a>
        </Link>
        <div className={styles.section}>
          <h2 className={styles.sectionHeader}>Library</h2>
          <Link href="/spells">
            <a
              className={`${styles.link} ${
                router.pathname === '/spells' ? styles.activeLink : ''
              }`}
            >
              Spells
            </a>
          </Link>
        </div>
      </nav>
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
        Sign out
      </button>

      <button
        onClick={() => {
          if (theme === 'light') {
            setTheme('dark')
          } else {
            setTheme('light')
          }
        }}
      >
        Set Theme {theme === 'light' ? 'Dark' : 'Light'}
      </button>
    </div>
  )
}

export { DrawerMenu as default }
