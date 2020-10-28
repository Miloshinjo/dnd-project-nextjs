import { IoIosClose } from 'react-icons/io'

import { useModal } from '../../../context/modal'

import icons from './icons'

import styles from './styles.module.css'

type Props = {
  type: string
  title: string
}

const ModalHeader: React.FC<Props> = ({ type, title }) => {
  const { closeModal } = useModal()
  return (
    <header className={styles.header}>
      <div className={styles.headerTitle}>
        <div className={styles.iconContainer}>{icons[type]}</div>
        <h1 className={styles.heading}>{title}</h1>
      </div>
      <button onClick={closeModal} className={styles.closeModal}>
        <IoIosClose size={35} />
      </button>
    </header>
  )
}

export { ModalHeader as default }
