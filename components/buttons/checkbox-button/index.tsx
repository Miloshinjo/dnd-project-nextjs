import * as React from 'react'
import { motion, useMotionValue, useTransform } from 'framer-motion'

type Props = {
  isChecked: boolean
  onClick: any
  text: string
  disabled?: boolean
}

const Example: React.FC<Props> = ({
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
      <motion.div className="border-2 border-gray-900 w-4 h-4 items-center justify-center flex">
        <motion.div
          variants={innerCircleVariants}
          animate={isChecked ? 'checked' : 'unchecked'}
          initial={'unchecked'}
          className="bg-gray-900 w-2 h-2"
        />
      </motion.div>
      <div className="ml-1">{text}</div>
    </button>
  )
}
export { Example as default }
