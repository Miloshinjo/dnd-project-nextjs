import { FaPlus, FaMinus } from 'react-icons/fa'

import styles from './styles.module.css'

type Props = {
  minusClick: any
  plusClick: any
  message: string
}

const AddOrRemove: React.FC<Props> = ({ minusClick, plusClick, message }) => {
  return (
    <div className="mt-4 px-1 flex text-sm justify-between items-center">
      {message}
      <div className="flex">
        <button className={styles.removeLevelButton} onClick={minusClick}>
          <FaMinus size={25} />
        </button>
        <button className={styles.addLevelButton} onClick={plusClick}>
          <FaPlus size={25} />
        </button>
      </div>
    </div>
  )
}

export { AddOrRemove as default }
