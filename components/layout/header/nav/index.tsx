import Link from 'next/link'
import { useRouter } from 'next/router'
import { signOut } from '../../../../lib/next-auth/client'

import styles from './styles.module.css'

const Nav: React.FC = () => {
  const router = useRouter()

  return (
    <nav className={styles.nav}>
      <Link href="/app">
        <a
          className={`${styles.navLink} ${
            router.pathname === '/app' ? styles.navLinkActive : ''
          }`}
        >
          Home
        </a>
      </Link>
      <Link href="/spells">
        <a
          className={`${styles.navLink} ${
            router.pathname === '/spells' ? styles.navLinkActive : ''
          }`}
        >
          Spells
        </a>
      </Link>
      <button
        className={styles.navLink}
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
    </nav>
  )
}

export { Nav as default }
