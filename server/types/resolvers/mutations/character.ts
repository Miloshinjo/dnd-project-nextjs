import { mutationField } from '@nexus/schema'

import { getUserId } from '../../../utils/helpers'
import errors from '../../../utils/errors'
import { handleError } from '../../../utils/helpers'

export const createCharacter = mutationField('createCharacter', {
  type: 'Character',
  args: {
    character: 'CharacterCreateInput',
  },
  async resolve(_parent, { character }, { prisma, req }) {
    if (!character) {
      return handleError(errors.serverError)
    }

    const userId = await getUserId(req)

    try {
      const { klassId, ...restCharacter } = character

      const createdCharacter = await prisma.character.create({
        data: {
          ...restCharacter,
          user: { connect: { id: userId } },
          klass: { connect: { id: Number(klassId) } },
        },
      })

      return createdCharacter
    } catch (err) {
      console.log(err)
      return handleError(errors.badCharacterData)
    }
  },
})

export const updateCharacter = mutationField('updateCharacter', {
  type: 'Character',
  args: {
    character: 'CharacterUpdateInput',
  },
  async resolve(_parent, { character }, { prisma }) {
    if (!character) {
      return handleError(errors.serverError)
    }

    try {
      const { klassId, skillId, id, ...restCharacter } = character

      if (skillId) {
        const skills = await prisma.character
          .findOne({
            where: {
              id: Number(id),
            },
          })
          .skills()

        const targetSkill = skills.find((skill) => skill.id === Number(skillId))

        const action = targetSkill ? 'disconnect' : 'connect'

        const updatedCharacter = await prisma.character.update({
          where: {
            id: Number(id),
          },
          data: {
            ...restCharacter,
            skills: { [action]: { id: Number(skillId) } },
          },
        })

        return updatedCharacter
      }

      if (klassId) {
        const updatedCharacter = await prisma.character.update({
          where: {
            id: Number(id),
          },
          data: {
            ...restCharacter,
            klass: { connect: { id: Number(klassId) } },
          },
        })

        return updatedCharacter
      }

      const updatedCharacter = await prisma.character.update({
        where: {
          id: Number(id),
        },
        data: restCharacter,
      })

      return updatedCharacter
    } catch (err) {
      console.log(err)
      return handleError(errors.badCharacterData)
    }
  },
})

export const deleteCharacter = mutationField('deleteCharacter', {
  type: 'Character',
  nullable: true,
  args: {
    character: 'CharacterDeleteInput',
  },
  async resolve(_parent, { character }, { prisma }) {
    if (!character) {
      return handleError(errors.serverError)
    }

    return prisma.character.delete({
      where: {
        id: Number(character.id),
      },
    })
  },
})

export const learnSpell = mutationField('learnSpell', {
  type: 'Character',
  args: {
    character: 'CharacterEditSpellInput',
  },
  async resolve(_parent, { character }, { prisma }) {
    if (!character) {
      return handleError(errors.serverError)
    }

    try {
      const updatedCharacter = await prisma.character.update({
        where: {
          id: Number(character.id),
        },
        data: {
          spells: { connect: { id: Number(character.spellId) } },
        },
      })

      return updatedCharacter
    } catch (err) {
      console.log(err)
      return handleError(errors.badCharacterData)
    }
  },
})

export const forgetSpell = mutationField('forgetSpell', {
  type: 'Character',
  args: {
    character: 'CharacterEditSpellInput',
  },
  async resolve(_parent, { character }, { prisma }) {
    if (!character) {
      return handleError(errors.serverError)
    }

    try {
      const updatedCharacter = await prisma.character.update({
        where: {
          id: Number(character.id),
        },
        data: {
          spells: { disconnect: { id: Number(character.spellId) } },
        },
      })

      return updatedCharacter
    } catch (err) {
      console.log(err)
      return handleError(errors.badCharacterData)
    }
  },
})

export const prepareSpell = mutationField('prepareSpell', {
  type: 'Character',
  args: {
    character: 'CharacterEditSpellInput',
  },
  async resolve(_parent, { character }, { prisma }) {
    if (!character) {
      return handleError(errors.serverError)
    }

    try {
      const updatedCharacter = await prisma.character.update({
        where: {
          id: Number(character.id),
        },
        data: {
          preparedSpells: { connect: { id: Number(character.spellId) } },
        },
      })

      return updatedCharacter
    } catch (err) {
      console.log(err)
      return handleError(errors.badCharacterData)
    }
  },
})

export const unprepareSpell = mutationField('unprepareSpell', {
  type: 'Character',
  args: {
    character: 'CharacterEditSpellInput',
  },
  async resolve(_parent, { character }, { prisma }) {
    if (!character) {
      return handleError(errors.serverError)
    }

    try {
      const updatedCharacter = await prisma.character.update({
        where: {
          id: Number(character.id),
        },
        data: {
          preparedSpells: { disconnect: { id: Number(character.spellId) } },
        },
      })

      return updatedCharacter
    } catch (err) {
      console.log(err)
      return handleError(errors.badCharacterData)
    }
  },
})

export const addSubclass = mutationField('addSubclass', {
  type: 'Character',
  args: {
    character: 'CharacterAddSubclassInputType',
  },
  async resolve(_parent, { character }, { prisma }) {
    if (!character) {
      return handleError(errors.serverError)
    }

    try {
      const updatedCharacter = await prisma.character.update({
        where: {
          id: Number(character.id),
        },
        data: {
          subclass: { connect: { id: Number(character.subclassId) } },
        },
      })

      return updatedCharacter
    } catch (err) {
      console.log(err)
      return handleError(errors.badCharacterData)
    }
  },
})
