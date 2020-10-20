import { FaPlus, FaMinus } from 'react-icons/fa'

import styles from './styles.module.css'

type Props = {
  minusClick: any
  plusClick: any
  message: string
  disabled?: boolean
}

const AddOrRemove: React.FC<Props> = ({
  minusClick,
  plusClick,
  message,
  disabled = false,
}) => {
  return (
    <div className="mt-4 px-1 flex text-sm justify-between items-center">
      {message}
      <div className="flex">
        <button
          className={styles.removeLevelButton}
          onClick={minusClick}
          disabled={disabled}
        >
          <FaMinus size={25} />
        </button>
        <button
          className={styles.addLevelButton}
          onClick={plusClick}
          disabled={disabled}
        >
          <FaPlus size={25} />
        </button>
      </div>
    </div>
  )
}

export { AddOrRemove as default }
