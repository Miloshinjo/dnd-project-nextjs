import * as React from 'react'
import { motion } from 'framer-motion'

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
  const innerCircleVariants = {
    checked: { scale: 1, opacity: 1 },
    unchecked: { scale: 0, opacity: 0 },
  }

  return (
    <button
      type="button"
      onClick={onClick}
      className={`flex items-center ${disabled ? 'opacity-50' : ''}`}
      disabled={disabled}
    >
      <motion.div className="border-2 border-gray-600 w-4 h-4 items-center justify-center flex rounded-full">
        <motion.div
          variants={innerCircleVariants}
          animate={isChecked ? 'checked' : 'unchecked'}
          initial={'unchecked'}
          className="bg-primary-600 w-2 h-2 rounded-full"
        />
      </motion.div>
      <div className="ml-1">{text}</div>
    </button>
  )
}
export { CheckboxButton as default }