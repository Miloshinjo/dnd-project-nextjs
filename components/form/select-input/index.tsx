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
    control: (
      styles,
      { data, isDisabled, isFocused, isSelected, isHovered },
    ) => ({
      ...styles,
      cursor: 'pointer',
      border: '1px solid #EDF2F7',
      boxShadow: isFocused
        ? '0 0 0 3px rgba(66, 153, 225, 0.5) !important'
        : 'none',
      '&:hover': {},
    }),
    option: (styles, { data, isDisabled, isFocused, isSelected }) => ({
      ...styles,
      cursor: 'pointer',
      backgroundColor: isFocused ? '#EDF2F7' : '',
      color: isSelected ? '#000' : '',
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
