import Link from 'next/link'
import DrawerMenu from './drawer-menu'
import Nav from './nav'

import styles from './styles.module.css'

type Props = {
  title: string
}

const Header: React.FC<Props> = ({ title }) => {
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
