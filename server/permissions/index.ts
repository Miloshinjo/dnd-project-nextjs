import { shield, not, allow } from 'graphql-shield'
import rules from './rules'

const permissions = shield({
  Query: {
    me: rules.isAuthenticatedUser,
    characters: rules.isAuthenticatedUser,
    '*': allow,
  },
  Mutation: {
    login: not(rules.isAuthenticatedUser),
    signup: not(rules.isAuthenticatedUser),
    createCharacter: rules.isAuthenticatedUser,
    updateCharacter: rules.isCharacterOwner,
    deleteCharacter: rules.isCharacterOwner,
    learnSpell: rules.isCharacterOwner,
    forgetSpell: rules.isCharacterOwner,
  },
})

export { permissions as default }
