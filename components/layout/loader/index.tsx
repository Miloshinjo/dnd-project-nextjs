import { motion } from 'framer-motion'
import { FaDiceD20 } from 'react-icons/fa'

const loaderVariants = {
  animationOne: {
    x: [-5, 5],
    y: [0, -8],
    transition: {
      x: {
        yoyo: Infinity,
        duration: 0.4,
      },
      y: {
        yoyo: Infinity,
        duration: 0.2,
        ease: 'easeOut',
      },
    },
  },
}

type Props = {
  color?: 'dark' | 'light'
  size?: number
}

const Loader: React.FC<Props> = ({ color = 'dark', size = 24 }) => {
  return (
    <>
      <motion.div variants={loaderVariants} animate="animationOne">
        <FaDiceD20
          color={color === 'dark' ? '#3182CE' : '#ffffff'}
          size={size}
        />
      </motion.div>
    </>
  )
}

export { Loader as default }
