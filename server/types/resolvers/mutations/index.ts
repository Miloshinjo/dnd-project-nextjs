import * as auth from './auth'
import * as character from './character'

export * from './inputs'

export const Mutation = {
  ...auth,
  ...character,
}
