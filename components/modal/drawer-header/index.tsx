import { IoMdClose } from 'react-icons/io'

import { useModal } from '../../../context/modal'

import styles from './styles.module.css'

type Props = {
  backgroundColor?: string
  logoVisible?: boolean
}

const DrawerHeader: React.FC<Props> = ({
  backgroundColor = 'var(--bg-drawer-header)',
  logoVisible = false,
}) => {
  const { closeModal } = useModal()

  return (
    <div className={`${styles.container}`} style={{ backgroundColor }}>
      {logoVisible && (
        <div className="flex items-center justify-center pl-4">
          <img src="/images/mini_logo.svg" alt="LOGO" className="w-8 h-8" />
        </div>
      )}
      <button
        type="button"
        className={styles.closeButton}
        onClick={() => {
          closeModal()
        }}
      >
        <IoMdClose size={25} />
      </button>
    </div>
  )
}

export { DrawerHeader as default }
