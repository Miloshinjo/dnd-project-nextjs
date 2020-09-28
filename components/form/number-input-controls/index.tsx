import { FaPlus, FaMinus } from 'react-icons/fa'

import styles from './styles.module.css'

type Props = {
  currentValue: number
  defaultValue: number
  setValue: Function
  valueType: string
}

const NumberInputControls: React.FC<Props> = ({
  currentValue,
  defaultValue,
  setValue,
  valueType,
}) => {
  const addValue = (
    currentValue: number,
    defaultValue: number,
    modifier: number,
  ): number => {
    if (currentValue === 0) {
      return modifier
    }

    if (!currentValue) {
      return defaultValue + modifier
    }

    return currentValue + modifier
  }

  return (
    <div className={styles.container}>
      <button
        type="button"
        onClick={() => {
          setValue(valueType, addValue(currentValue, defaultValue, 1))
        }}
        className={styles.valueButton}
      >
        <FaPlus size={10} />
        <span className={styles.valueButtonNumber}>1</span>
      </button>
      <button
        type="button"
        onClick={() => {
          setValue(valueType, addValue(currentValue, defaultValue, 5))
        }}
        className={styles.valueButton}
      >
        <FaPlus size={10} />
        <span className={styles.valueButtonNumber}>5</span>
      </button>
      <button
        type="button"
        onClick={() => {
          setValue(valueType, addValue(currentValue, defaultValue, -1))
        }}
        className={styles.valueButton}
      >
        <FaMinus size={10} />
        <span className={styles.valueButtonNumber}>1</span>
      </button>
      <button
        type="button"
        onClick={() => {
          setValue(valueType, addValue(currentValue, defaultValue, -5))
        }}
        className={styles.valueButton}
      >
        <FaMinus size={10} />
        <span className={styles.valueButtonNumber}>5</span>
      </button>
    </div>
  )
}

export { NumberInputControls as default }
