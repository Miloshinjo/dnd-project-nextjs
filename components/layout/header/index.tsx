import Link from 'next/link'

import DrawerMenu from './drawer-menu'
import Nav from './nav'

import styles from './styles.module.css'

const Header: React.FC = () => {
  return (
    <header className={styles.header}>
      <DrawerMenu />
      <Nav />
      <Link href="/app">
        <img src="/images/mini_logo.svg" className="h-full" />
      </Link>
    </header>
  )
}

export { Header as default }
