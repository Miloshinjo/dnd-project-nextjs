import * as React from 'react'
import { motion } from 'framer-motion'

import styles from './styles.module.css'

const innerCircleVariants = {
  checked: { scale: 1, opacity: 1 },
  unchecked: { scale: 0, opacity: 0 },
}

type Props = {
  isChecked: boolean
  onClick: any
  text: string
  disabled?: boolean
}

const CheckboxButton: React.FC<Props> = ({
  isChecked,
  onClick,
  text,
  disabled = false,
}) => {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`${styles.container} ${disabled ? 'opacity-50' : ''}`}
      disabled={disabled}
    >
      <div className={styles.outerCircle}>
        <motion.div
          variants={innerCircleVariants}
          animate={isChecked ? 'checked' : 'unchecked'}
          initial={'unchecked'}
          className={styles.innerCircle}
        />
      </div>
      <div className="ml-1">{text}</div>
    </button>
  )
}
export { CheckboxButton as default }
