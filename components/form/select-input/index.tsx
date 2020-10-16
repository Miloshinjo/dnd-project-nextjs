import { Controller } from 'react-hook-form'
import Select from 'react-select'

import styles from './styles.module.css'

type Props = {
  label: string
  errors: Record<any, any>
  options: Array<{
    label: string
    value: any
  }>
  name: string
  control: any
  value?: any
}

const SelectInput: React.FC<Props> = ({
  options,
  errors,
  label,
  name,
  control,
  value = '',
}) => {
  const colourStyles = {
    singleValue: (
      styles,
      { data, isDisabled, isFocused, isSelected, isHovered },
    ) => ({
      ...styles,
      color: 'var(--text-primary)',
    }),
    placeholder: (
      styles,
      { data, isDisabled, isFocused, isSelected, isHovered },
    ) => ({
      ...styles,
      color: 'var(--color-placeholder)',
    }),
    control: (
      styles,
      { data, isDisabled, isFocused, isSelected, isHovered },
    ) => ({
      ...styles,
      cursor: 'pointer',
      border: '1px solid var(--border-primary)',
      boxShadow: isFocused
        ? '0 0 0 3px rgba(66, 153, 225, 0.5) !important'
        : 'none',
      backgroundColor: 'var(--bg-secondary)',
    }),
    option: (styles, { data, isDisabled, isFocused, isSelected }) => ({
      ...styles,
      cursor: 'pointer',
      border: 'var(--border-primary)',
      backgroundColor: isFocused ? 'var(--bg-focused)' : 'var(--bg-secondary)',
      color: 'var(--text-primary)',
    }),
    menu: (styles, { data, isDisabled, isFocused, isSelected }) => ({
      ...styles,
      backgroundColor: 'var(--bg-secondary)',
    }),
  }

  return (
    <div>
      <label className={styles.label} htmlFor={name}>
        {label}
      </label>
      <div className={styles.selectContainer}>
        <Controller
          styles={colourStyles}
          instanceId={name}
          as={Select}
          options={options}
          name={name}
          control={control}
          rules={{ required: true }}
          defaultValue={null}
          value={value}
          onBlur={(event) => event.preventDefault()}
        />
      </div>
      {errors[name] && (
        <span role="alert" className={styles.error}>
          {errors[name].message}
        </span>
      )}
    </div>
  )
}

export { SelectInput as default }
