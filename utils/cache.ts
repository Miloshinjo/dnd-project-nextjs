import { cacheExchange, QueryInput, Cache } from '@urql/exchange-graphcache'

import {
  CharacterDocument,
  DeleteCharacterMutationVariables,
  SkillsDocument,
  SpellDocument,
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
      const { id, skillId, ...restCharacter } = variables.character as any

      if (skillId) {
        // make this better
        const { character } = cache.readQuery({
          query: CharacterDocument,
          variables: { id },
        })

        const { skills } = character as any

        const skillsData = cache.readQuery({ query: SkillsDocument })

        const allSkills: any = skillsData.skills

        const isMatch = skills.find((skill) => skill.id === skillId)

        if (isMatch) {
          return {
            __typename: 'Character',
            id,
            skills: skills.filter((skill) => skill.id !== skillId),
          }
        } else {
          return {
            __typename: 'Character',
            id,
            skills: [
              ...skills,
              allSkills.find((skill) => skill.id === skillId),
            ],
          }
        }
      }

      return {
        __typename: 'Character',
        id,
        ...restCharacter,
      }
    },
    forgetSpell: (variables, cache, _) => {
      const { id, spellId } = variables.character as any

      const { character } = cache.readQuery({
        query: CharacterDocument,
        variables: { id },
      })

      const { spells, name } = character as any

      return {
        __typename: 'Character',
        id,
        name,
        spells: spells.filter((spell) => spell.id !== spellId),
      }
    },
    prepareSpell: (variables, cache, _) => {
      const { id, spellId } = variables.character as any

      const { character } = cache.readQuery({
        query: CharacterDocument,
        variables: { id },
      })

      const { preparedSpells, name } = character as any

      return {
        __typename: 'Character',
        id,
        name,
        preparedSpells: [...preparedSpells],
      }
    },
    unprepareSpell: (variables, cache, _) => {
      const { id, spellId } = variables.character as any

      const { character } = cache.readQuery({
        query: CharacterDocument,
        variables: { id },
      })

      const { preparedSpells, name } = character as any

      return {
        __typename: 'Character',
        id,
        name,
        preparedSpells: preparedSpells.filter((spell) => spell.id !== spellId),
      }
    },
  },
})

export { cache as default }
