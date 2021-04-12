import React from 'react'
import { IoMdClose } from 'react-icons/io'
import styles from './styles.module.css'

const SlotButton = ({ onClick, isChecked, editSlots }) => {
  return (
    <button
      key={Math.random()}
      className={`${styles.spellSlotButton} ${
        editSlots ? styles.editSlots : ''
      }`}
      onClick={onClick}
    >
      {isChecked && <IoMdClose className={styles.spellSlotChecked} />}
    </button>
  )
}

const exportedSlotButton = React.memo(SlotButton)

export { exportedSlotButton as default }
