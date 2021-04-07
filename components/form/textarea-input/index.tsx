import styles from './styles.module.css'

type Props = {
  defaultValue?: string
  errors: Record<any, any>
  label: string
  name: string
  placeholder: string
  register: any
  validations?: Record<any, any>
}

const TextareaInput: React.FC<Props> = ({
  defaultValue = '',
  errors,
  label,
  name,
  register,
  placeholder,
  validations = {},
}) => {
  return (
    <>
      <label className={styles.label} htmlFor={name}>
        {label}
      </label>
      <textarea
        aria-invalid={errors.name ? 'true' : 'false'}
        id={name}
        className={`${styles.input} ${errors[name] && 'border-yellow-600'}`}
        name={name}
        defaultValue={defaultValue}
        placeholder={placeholder}
        ref={register(validations)}
      />
      {errors[name] && (
        <span role="alert" className={styles.error}>
          {errors[name].message}
        </span>
      )}
    </>
  )
}

export { TextareaInput as default }
