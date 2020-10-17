import React from 'react'
import styles from './styles.module.css'

const SlotButton = ({ onClick, isChecked, editSlots }) => {
  return (
    <button
      key={Math.random()}
      className={`${styles.spellSlotButton} ${
        editSlots ? 'border border-gray-900' : ''
      }`}
      onClick={onClick}
    >
      {isChecked && <div className={styles.spellSlotChecked} />}
    </button>
  )
}

const exportedSlotButton = React.memo(SlotButton)

export { exportedSlotButton as default }
