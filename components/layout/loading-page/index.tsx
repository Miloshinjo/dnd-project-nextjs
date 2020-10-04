import { motion } from 'framer-motion'
import Loader from '../loader'

const LoadingPage = () => {
  return (
    <div className="h-screen w-screen fixed flex flex-col items-center justify-center">
      <Loader />
    </div>
  )
}

export { LoadingPage as default }
