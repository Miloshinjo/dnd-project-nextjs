import { useState } from 'react'
import Link from 'next/link'
import { destroyCookie } from 'nookies'
import { useRouter } from 'next/router'
import { motion } from 'framer-motion'

import { useMeQuery } from '../../../../generated/graphql'

import { drawerVariants } from './animaiton'
import styles from './styles.module.css'

const DrawerMenu: React.FC = () => {
  const router = useRouter()
  const [isOpen, setIsOpen] = useState<boolean>(false)

  const closeDrawer = () => {
    setIsOpen(false)
  }

  const signOut = () => {
    destroyCookie(null, 'jwt', { path: '/' })
    router.push('/')
    router.reload()
  }

  const [me] = useMeQuery()

  return (
    <div className={styles.container}>
      <button
        className={styles.hamburger}
        aria-label="User menu"
        aria-haspopup="true"
        onClick={() => {
          setIsOpen(true)
        }}
      >
        <span className={styles.hamburgerBun} />
        <span className="h-2" />
        <span className={styles.hamburgerBunTwo} />
      </button>

      <motion.div
        className={styles.drawer}
        variants={drawerVariants}
        initial="closed"
        animate={isOpen ? 'open' : 'closed'}
      >
        <div className={styles.drawerHeader}>
          <button onClick={closeDrawer} className={styles.drawerCloseButton}>
            &times;
          </button>
        </div>
        <div className={styles.contentContainer}>
          <div className={styles.username}>{me.data?.me?.username}</div>
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
          <button className={styles.link} onClick={signOut}>
            Sign out
          </button>
        </div>
      </motion.div>
    </div>
  )
}

export { DrawerMenu as default }
