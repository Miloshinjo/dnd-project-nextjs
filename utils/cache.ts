import { cacheExchange, QueryInput, Cache } from '@urql/exchange-graphcache'

import {
  CharacterDocument,
  CharacterSpellDocument,
  DeleteCharacterMutationVariables,
  SkillsDocument,
} from '../generated/graphql'

function betterUpdateQuery<Result, Query>(
  cache: Cache,
  qi: QueryInput,
  result: any,
  fn: (r: Result, q: Query) => Query,
) {
  return cache.updateQuery(qi, (data) => fn(result, data as any) as any)
}

function invalidateAllCharacters(cache: Cache) {
  const allFields = cache.inspectFields('Query')
  const fieldInfos = allFields.filter((info) => info.fieldName === 'characters')
  fieldInfos.forEach((fi) => {
    cache.invalidate('Query', 'characters', fi.arguments || {})
  })
}

const cache = cacheExchange({
  updates: {
    Mutation: {
      createCharacter: (result, args, cache, info) => {
        cache.invalidate('Query', 'characters')
      },
      deleteCharacter: (result, args, cache, info) => {
        cache.invalidate({
          __typename: 'Character',
          id: (args.character as DeleteCharacterMutationVariables).id,
        })
      },
    },
  },
  optimistic: {
    updateCharacter: (variables, cache, info) => {
      const { id, ...restCharacter } = variables.character as any

      return {
        __typename: 'Character',
        id,
        ...restCharacter,
      }
    },
  },
})

export { cache as default }
