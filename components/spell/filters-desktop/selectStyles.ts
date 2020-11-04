export const colourStyles = {
  singleValue: (styles) => ({
    ...styles,
    color: 'var(--text-primary)',
    fontSize: '14px',
    textTransform: 'capitalize',
  }),
  placeholder: (styles) => ({
    ...styles,
    color: 'var(--color-placeholder)',
    fontSize: '14px',
  }),
  control: (styles, { isFocused }) => ({
    ...styles,
    cursor: 'pointer',
    border: '1px solid var(--border-primary)',
    boxShadow: isFocused
      ? '0 0 0 3px rgba(66, 153, 225, 0.1) !important'
      : 'none',
    outline: 'none',
    backgroundColor: 'var(--bg-secondary)',
    minWidth: '11rem',
    fontSize: '14px',
  }),
  option: (styles, { isFocused }) => {
    return {
      ...styles,
      cursor: 'pointer',
      textAlign: 'left',
      border: 'var(--border-primary)',
      backgroundColor: isFocused ? 'var(--bg-focused)' : 'var(--bg-secondary)',
      color: 'var(--text-primary)',
      fontSize: '14px',
      textTransform: 'capitalize',
    }
  },
  menu: (styles) => ({
    ...styles,
    backgroundColor: 'var(--bg-secondary)',
  }),
  multiValue: (styles) => {
    return {
      ...styles,
      backgroundColor: 'var(--bg-tertiary)',
      textTransform: 'capitalize',
    }
  },
  multiValueLabel: (styles, { data }) => ({
    ...styles,
    color: data.color,
  }),
  multiValueRemove: (styles, { data }) => ({
    ...styles,
    color: data.color,
    ':hover': {
      backgroundColor: data.color,
      color: 'white',
    },
  }),
}
