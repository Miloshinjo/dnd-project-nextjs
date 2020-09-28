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
    </header>
  )
}

export { Header as default }
