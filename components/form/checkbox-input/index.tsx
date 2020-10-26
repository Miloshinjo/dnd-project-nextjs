import { motion } from 'framer-motion'

import styles from './styles.module.css'

const innerCircleVariants = {
  checked: { scale: 1, opacity: 1 },
  unchecked: { scale: 0, opacity: 0 },
}

type Props = {
  register: any
  name: string
  currentValue: boolean
}

const CheckboxInput: React.FC<Props> = ({ register, name, currentValue }) => {
  return (
    <label className={styles.label}>
      <input
        type="checkbox"
        className="visually-hidden"
        ref={register({})}
        name={name}
      />
      <div className={styles.outerCircle}>
        <motion.div
          variants={innerCircleVariants}
          animate={currentValue === true ? 'checked' : 'unchecked'}
          initial={'unchecked'}
          className={styles.innerCircle}
        />
      </div>
      <div className="ml-1 text-sm">Requires Attunement</div>
    </label>
  )
}

export { CheckboxInput as default }
