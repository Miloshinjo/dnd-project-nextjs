export default {
  alignment: {
    required: 'Alignment is required',
  },
  name: {
    required: 'Name is required',
    minLength: {
      value: 2,
      message: 'Invalid email address',
    },
  },
  race: {
    required: 'Race is required',
  },
  klass: {
    required: 'Class is required',
  },
}
