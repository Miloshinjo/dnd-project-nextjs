import {
  AuthenticationError,
  UserInputError,
  ApolloError,
  ForbiddenError,
} from 'apollo-server-micro'

const errors = {
  serverError: new ApolloError('Something went wrong!'),
  notAuthenticated: new AuthenticationError('Unauthorized request!'),
  unableToRegister: new UserInputError('Unable to register!'),
  invalidUser: new UserInputError('Invalid credentials'),
  passwordTooShort: new UserInputError(
    'Password must be 8 characters or longer!'
  ),
  usernameTooShort: new UserInputError(
    'Username must be 2 characters or longer!'
  ),
  passwordsMismatch: new UserInputError('Passwords do not match!'),
  badCharacterData: new UserInputError(
    'Could not create charater! Check your data.'
  ),
  forbiddenError: new ForbiddenError(
    'You are not allowed to edit this resource'
  ),
}

export { errors as default }
