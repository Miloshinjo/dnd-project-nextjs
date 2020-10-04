import Link from 'next/link'
import { useRouter } from 'next/router'
import { signOut, useSession } from 'next-auth/client'

import styles from './styles.module.css'

const DrawerMenu: React.FC = () => {
  const router = useRouter()

  const [session] = useSession()

  console.log({ session })

  const email = session?.user?.email
  const name = session?.user?.name
  const image = session?.user?.image

  return (
    <div className={styles.drawer}>
      <div className={styles.userProfile}>
        {image && (
          <div className={styles.avatarContainer}>
            <img
              src={image}
              alt="profile image"
              className={styles.avatarImage}
            />
          </div>
        )}

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
    </div>
  )
}

export { DrawerMenu as default }
