import { IoIosClose } from 'react-icons/io'

import icons from './icons'

import styles from './styles.module.css'

const ModalHeader = ({ type, title, closeModal }) => {
  return (
    <header className={styles.header}>
      <div className={styles.headerTitle}>
        <div className={styles.iconContainer}>{icons[type]}</div>
        <h1 className={styles.heading}>{title}</h1>
      </div>
      <button onClick={closeModal}>
        <IoIosClose size={35} />
      </button>
    </header>
  )
}

export { ModalHeader as default }
