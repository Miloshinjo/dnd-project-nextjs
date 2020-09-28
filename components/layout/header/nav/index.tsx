import Link from 'next/link'
import { destroyCookie } from 'nookies'
import { useRouter } from 'next/router'

import styles from './styles.module.css'

const Nav: React.FC = () => {
  const router = useRouter()

  const signOut = () => {
    destroyCookie(null, 'jwt', { path: '/' })
    router.push('/')
    router.reload()
  }

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
      <button className={styles.navLink} onClick={signOut}>
        Sign out
      </button>
    </nav>
  )
}

export { Nav as default }
