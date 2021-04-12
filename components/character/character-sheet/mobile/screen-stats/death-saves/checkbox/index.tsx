import { useState } from 'react'
import { motion } from 'framer-motion'
import { IoMdCheckmark } from 'react-icons/io'
import { IoMdClose } from 'react-icons/io'

import styles from './styles.module.css'

const markVariants = {
  checked: {
    opacity: 1,
  },
  unchecked: {
    opacity: 0,
  },
}

type Props = {
  type: 'success' | 'fail'
}

const Checkbox: React.FC<Props> = ({ type }) => {
  const [checked, setChecked] = useState<boolean>(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setChecked(e.target.checked)
  }

  return (
    <label className={styles.label}>
      <input
        type="checkbox"
        className="visually-hidden"
        onChange={handleChange}
        checked={checked}
      />
      <motion.div
        initial="unchecked"
        animate={checked ? 'checked' : 'unchecked'}
        variants={markVariants}
      >
        {type === 'success' ? (
          <IoMdCheckmark color="#1a202c" size={20} />
        ) : (
          <IoMdClose color="#1a202c" size={20} />
        )}
      </motion.div>
    </label>
  )
}

export { Checkbox as default }
