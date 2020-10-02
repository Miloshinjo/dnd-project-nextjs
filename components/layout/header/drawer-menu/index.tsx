import { useModal } from '../../../../context/modal'

import styles from './styles.module.css'

const DrawerMenu: React.FC = () => {
  const { openModal } = useModal()
  return (
    <div className={styles.container}>
      <button
        className={styles.hamburger}
        aria-label="User menu"
        aria-haspopup="true"
        onClick={() => {
          openModal({
            type: 'mobileDrawer',
            props: null,
          })
        }}
      >
        <span className={styles.hamburgerBun} />
        <span className="h-2" />
        <span className={styles.hamburgerBunTwo} />
      </button>
    </div>
  )
}

export { DrawerMenu as default }
