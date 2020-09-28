import styles from './styles.module.css'

type Props = {
  defaultValue?: string
  errors: Record<any, any>
  label: string
  name: string
  placeholder: string
  register: any
  type?: 'text' | 'email' | 'password'
  validations?: Record<any, any>
}

const TextInput: React.FC<Props> = ({
  defaultValue = '',
  errors,
  label,
  name,
  register,
  placeholder,
  type = 'text',
  validations = {},
}) => {
  return (
    <>
      <label className={styles.label} htmlFor={name}>
        {label}
      </label>
      <input
        aria-invalid={errors.name ? 'true' : 'false'}
        id={name}
        className={`${styles.input} ${errors[name] && 'border-orange-600'}`}
        name={name}
        defaultValue={defaultValue}
        placeholder={placeholder}
        ref={register(validations)}
        type={type}
      />
      {errors[name] && (
        <span role="alert" className={styles.error}>
          {errors[name].message}
        </span>
      )}
    </>
  )
}

export { TextInput as default }
