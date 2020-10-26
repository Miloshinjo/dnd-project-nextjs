export default {
  name: {
    required: 'Name is required',
    minLength: {
      value: 1,
      message: 'Name too short',
    },
    maxLength: {
      value: 80,
      message: 'Name too long',
    },
  },
  description: {
    required: 'Description is required',
    minLength: {
      value: 1,
      message: 'Description too short',
    },
    maxLength: {
      value: 1000,
      message: 'Description too long',
    },
  },
}
