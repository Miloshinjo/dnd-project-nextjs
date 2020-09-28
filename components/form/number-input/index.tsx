import styles from './styles.module.css'

type Props = {
  defaultValue?: number
  errors: Record<any, any>
  name: string
  placeholder: string
  register: any
  validations?: Record<any, any>
}

const NumberInput: React.FC<Props> = ({
  defaultValue = 0,
  errors,
  name,
  register,
  placeholder,
  validations = {},
}) => {
  return (
    <div className={styles.container}>
      <input
        id={name}
        className={styles.input}
        name={name}
        defaultValue={defaultValue}
        placeholder={placeholder}
        ref={register(validations)}
        type="number"
      />
    </div>
  )
}

export { NumberInput as default }
