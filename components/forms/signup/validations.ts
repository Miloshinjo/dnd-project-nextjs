const validations = (watch) => ({
  email: {
    required: 'Email is required',
    pattern: {
      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
      message: 'Invalid email address',
    },
  },
  username: {
    required: 'Username is required',
    minLength: {
      value: 2,
      message: 'Username must be at least 2 characters',
    },
  },
  password: {
    required: 'Password is required',
    minLength: {
      value: 8,
      message: 'Password must be at least 8 characters',
    },
  },
  passwordConfirm: {
    required: 'Password confirmation is required',
    validate: (value) => {
      return value === watch('password') || 'Passwords must match'
    },
  },
})

export { validations as default }
