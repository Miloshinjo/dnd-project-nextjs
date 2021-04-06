import { shield, allow } from 'graphql-shield'

import rules from './rules'

const permissions = shield({
  Query: {
    me: rules.isAuthenticatedUser,
    characters: rules.isAuthenticatedUser,
    character: rules.isCharacterOwner,
    '*': allow,
  },
  Mutation: {
    createCharacter: rules.isAuthenticatedUser,
    updateCharacter: rules.isCharacterOwner,
    deleteCharacter: rules.isCharacterOwner,
    learnSpell: rules.isCharacterOwner,
    forgetSpell: rules.isCharacterOwner,
    addSubclass: rules.isCharacterOwner,
    unprepareSpell: rules.isCharacterOwner,
    prepareSpell: rules.isCharacterOwner,
    addSkill: rules.isCharacterOwner,
    removeSkill: rules.isCharacterOwner,
  },
})

export { permissions as default }
