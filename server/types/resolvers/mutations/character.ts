import { mutationField } from '@nexus/schema'

import errors from '../../../utils/errors'
import { getUserId, handleError } from '../../../utils/helpers'

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
      const { id, ...restCharacter } = character

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

    try {
      await prisma.magicItem.deleteMany({
        where: {
          characterId: Number(character.id),
        },
      })

      return prisma.character.delete({
        where: {
          id: Number(character.id),
        },
      })
    } catch (e) {
      console.log(e)
    }
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
    character: 'CharacterAddSubclassInput',
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

export const addSkill = mutationField('addSkill', {
  type: 'Character',
  args: {
    character: 'CharacterEditSkillInput',
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
          skills: { connect: { id: Number(character.skillId) } },
        },
      })

      return updatedCharacter
    } catch (err) {
      console.log(err)
      return handleError(errors.badCharacterData)
    }
  },
})

export const removeSkill = mutationField('removeSkill', {
  type: 'Character',
  args: {
    character: 'CharacterEditSkillInput',
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
          skills: { disconnect: { id: Number(character.skillId) } },
        },
      })

      return updatedCharacter
    } catch (err) {
      console.log(err)
      return handleError(errors.badCharacterData)
    }
  },
})
