import { useCallback } from 'react'
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
  isSearchable?: boolean
}

const SelectInput: React.FC<Props> = ({
  options,
  errors,
  label,
  name,
  control,
  value = '',
  isSearchable = true,
}) => {
  const getOptionColor = useCallback(
    (label) => {
      switch (label) {
        case 'Uncommon':
          return 'var(--color-uncommon)'
        case 'Rare':
          return 'var(--color-rare)'
        case 'Very rare':
          return 'var(--color-very-rare)'
        case 'Legendary':
          return 'var(--color-legendary)'
        case 'Artifact':
          return 'var(--color-artifact)'
        case 'Unknown':
          return 'var(--color-unknown)'
        default:
          return 'var(--text-primary)'
      }
    },
    [label],
  )

  const colourStyles = {
    singleValue: (styles, { data }) => ({
      ...styles,
      color: getOptionColor(data.label),
    }),
    placeholder: (styles) => ({
      ...styles,
      color: 'var(--color-placeholder)',
    }),
    control: (styles, { isFocused }) => ({
      ...styles,
      cursor: 'pointer',
      border: '1px solid var(--border-primary)',
      boxShadow: isFocused
        ? '0 0 0 3px rgba(66, 153, 225, 0.5) !important'
        : 'none',
      backgroundColor: 'var(--bg-secondary)',
    }),
    option: (styles, { data, isFocused }) => {
      return {
        ...styles,
        cursor: 'pointer',
        textAlign: 'left',
        border: 'var(--border-primary)',
        backgroundColor: isFocused
          ? 'var(--bg-focused)'
          : 'var(--bg-secondary)',
        color: getOptionColor(data.label),
      }
    },
    menu: (styles) => ({
      ...styles,
      backgroundColor: 'var(--bg-secondary)',
    }),
  }

  return (
    <div className="flex flex-col w-full">
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
          isSearchable={isSearchable}
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
