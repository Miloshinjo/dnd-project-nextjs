import {
  cacheExchange,
  QueryInput,
  Cache,
  Variables,
  ResolveInfo,
} from '@urql/exchange-graphcache'

import {
  CharacterDocument,
  CharacterSpellDocument,
  DeleteCharacterMutationVariables,
  SkillsDocument,
  Skill,
  Character,
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
    addSkill: (variables, cache, info) => {
      const { id, skillId } = variables.character as any

      const characterQuery = cache.readQuery({
        query: CharacterDocument,
        variables: {
          id,
        },
      })

      const skillsQuery = cache.readQuery({
        query: SkillsDocument,
      })

      const currentSkill: Skill = (skillsQuery.skills as Array<Skill>).find(
        (skill) => skill.id === skillId,
      )

      const skills = (characterQuery.character as Character).skills

      skills.push(currentSkill)

      return {
        __typename: 'Character',
        id,
        skills,
      }
    },
    removeSkill: (variables, cache, info) => {
      const { id, skillId } = variables.character as any

      const characterQuery = cache.readQuery({
        query: CharacterDocument,
        variables: {
          id,
        },
      })

      const skills = (characterQuery.character as Character).skills.filter(
        (skill) => skill.id !== skillId,
      )

      return {
        __typename: 'Character',
        id,
        skills,
      }
    },
  },
})

export { cache as default }
