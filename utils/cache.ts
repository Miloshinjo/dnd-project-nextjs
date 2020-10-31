import { cacheExchange, QueryInput, Cache } from '@urql/exchange-graphcache'

import {
  CharacterDocument,
  DeleteCharacterMutationVariables,
  SkillsDocument,
  SpellDocument,
  Skill,
  Spell,
  Character,
  CreateMagicItemMutation,
  CharacterQuery,
  DeleteMagicItemMutationVariables,
} from '../generated/graphql'

function betterUpdateQuery<Result, Query>(
  cache: Cache,
  qi: QueryInput,
  result: any,
  fn: (r: Result, q: Query) => Query,
) {
  return cache.updateQuery(qi, (data) => fn(result, data as any) as any)
}

// function invalidateAllCharacters(cache: Cache) {
//   const allFields = cache.inspectFields('Query')
//   const fieldInfos = allFields.filter((info) => info.fieldName === 'characters')
//   fieldInfos.forEach((fi) => {
//     cache.invalidate('Query', 'characters', fi.arguments || {})
//   })
// }

const cache = cacheExchange({
  updates: {
    Mutation: {
      createCharacter: (_result, _args, cache, _info) => {
        cache.invalidate('Query', 'characters')
      },
      deleteCharacter: (_result, args, cache, _info) => {
        cache.invalidate({
          __typename: 'Character',
          id: (args.character as DeleteCharacterMutationVariables).id,
        })
      },
      createMagicItem: (_result, args, cache, _info) => {
        betterUpdateQuery<CreateMagicItemMutation, CharacterQuery>(
          cache,
          {
            query: CharacterDocument,
            variables: {
              id: (args.item as any).characterId,
            },
          },
          _result,
          (result, query) => {
            if (!result?.createMagicItem) {
              return query
            } else {
              query.character.magicItems.push(result.createMagicItem)
              return query
            }
          },
        )
      },
      deleteMagicItem: (_result, args, cache, _info) => {
        cache.invalidate({
          __typename: 'MagicItem',
          id: (args.item as DeleteMagicItemMutationVariables).id,
        })
      },
    },
  },
  optimistic: {
    updateCharacter: (variables, _cache, _info) => {
      const { id, ...restCharacter } = variables.character as any

      return {
        __typename: 'Character',
        id,
        ...restCharacter,
      }
    },
    addSkill: (variables, cache, _info) => {
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
    removeSkill: (variables, cache, _info) => {
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
    prepareSpell: (variables, cache, _info) => {
      const { id, spellId } = variables.character as any

      const characterQuery = cache.readQuery({
        query: CharacterDocument,
        variables: {
          id,
        },
      })

      const spellQuery = cache.readQuery({
        query: SpellDocument,
        variables: {
          id: spellId,
        },
      })

      const spell = {
        __typename: 'Spell',
        id: (spellQuery.spell as Spell).id,
        name: (spellQuery.spell as Spell).name,
        level: (spellQuery.spell as Spell).level,
        castingTime: (spellQuery.spell as Spell).castingTime,
        school: (spellQuery.spell as Spell).school,
        range: (spellQuery.spell as Spell).range,
        components: (spellQuery.spell as Spell).components,
      }

      const preparedSpells: Array<Pick<
        Spell,
        | 'id'
        | 'name'
        | 'level'
        | 'castingTime'
        | 'school'
        | 'range'
        | 'components'
      >> = (characterQuery.character as Character).preparedSpells

      preparedSpells.push(spell)

      return {
        __typename: 'Character',
        id,
        preparedSpells,
      }
    },
    unprepareSpell: (variables, cache, _info) => {
      const { id, spellId } = variables.character as any

      const characterQuery = cache.readQuery({
        query: CharacterDocument,
        variables: {
          id,
        },
      })

      const preparedSpells = (characterQuery.character as Character).preparedSpells.filter(
        (spell) => spell.id !== spellId,
      )

      return {
        __typename: 'Character',
        id,
        preparedSpells,
      }
    },
    learnSpell: (variables, cache, _info) => {
      const { id, spellId } = variables.character as any

      const characterQuery = cache.readQuery({
        query: CharacterDocument,
        variables: {
          id,
        },
      })

      const spellQuery = cache.readQuery({
        query: SpellDocument,
        variables: {
          id: spellId,
        },
      })

      const spell = {
        __typename: 'Spell',
        id: (spellQuery.spell as Spell).id,
        name: (spellQuery.spell as Spell).name,
        level: (spellQuery.spell as Spell).level,
        castingTime: (spellQuery.spell as Spell).castingTime,
        school: (spellQuery.spell as Spell).school,
        range: (spellQuery.spell as Spell).range,
        components: (spellQuery.spell as Spell).components,
      }

      const spells: Array<Pick<
        Spell,
        | 'id'
        | 'name'
        | 'level'
        | 'castingTime'
        | 'school'
        | 'range'
        | 'components'
      >> = (characterQuery.character as Character).spells

      spells.push(spell)

      return {
        __typename: 'Character',
        id,
        spells,
      }
    },
    forgetSpell: (variables, cache, _info) => {
      const { id, spellId } = variables.character as any

      const characterQuery = cache.readQuery({
        query: CharacterDocument,
        variables: {
          id,
        },
      })

      const spells = (characterQuery.character as Character).spells.filter(
        (spell) => spell.id !== spellId,
      )

      return {
        __typename: 'Character',
        id,
        spells,
      }
    },
  },
})

export { cache as default }
