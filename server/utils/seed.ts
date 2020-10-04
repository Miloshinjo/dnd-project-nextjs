import fs from 'fs'
import { PrismaClient } from '@prisma/client'

const spells = JSON.parse(
  fs.readFileSync(`${process.cwd()}/server/__seed__/spells.json`, 'utf-8'),
)
const klasses = JSON.parse(
  fs.readFileSync(`${process.cwd()}/server/__seed__/klasses.json`, 'utf-8'),
)

const subclasses = JSON.parse(
  fs.readFileSync(`${process.cwd()}/server/__seed__/subclasses.json`, 'utf-8'),
)
const skills = JSON.parse(
  fs.readFileSync(`${process.cwd()}/server/__seed__/skills.json`, 'utf-8'),
)

const seedSpells = async (prisma: PrismaClient): Promise<void> => {
  try {
    spells.forEach(async (spell) => {
      await prisma.spell.upsert({
        create: {
          ...spell,
        },
        update: {
          ...spell,
        },
        where: {
          name: spell.name,
        },
      })
    })
    console.log('Seed spells successfully loaded!')
  } catch (err) {
    console.log(err)
  } finally {
    await prisma.$disconnect()
  }
}

const seedKlasses = async (prisma: PrismaClient): Promise<void> => {
  try {
    klasses.forEach(async (klass) => {
      klass.savingThrows = {
        set: klass.savingThrows,
      }
      klass.primaryAbility = {
        set: klass.primaryAbility,
      }
      klass.armor = {
        set: klass.armor,
      }
      klass.weapons = {
        set: klass.weapons,
      }
      klass.skills = {
        set: klass.skills,
      }

      await prisma.klass.upsert({
        create: {
          ...klass,
        },
        update: {
          ...klass,
        },
        where: {
          name: klass.name,
        },
      })
    })
    console.log('Seed classes successfully loaded!')
  } catch (err) {
    console.log(err)
  } finally {
    await prisma.$disconnect()
  }
}

const seedSkills = async (prisma: PrismaClient): Promise<void> => {
  try {
    skills.forEach(async (skill) => {
      await prisma.skill.upsert({
        create: {
          ...skill,
        },
        update: {
          ...skill,
        },
        where: {
          name: skill.name,
        },
      })
    })
    console.log('Seed skills successfully loaded!')
  } catch (err) {
    console.log(err)
  } finally {
    await prisma.$disconnect()
  }
}

const findIdByName = (name: string, arr: Array<any>) => {
  const klass = arr.find((el) => el.name === name)

  return klass.id
}

const updateSubclassByKlass = (
  klassName: string,
  prisma: any,
  subclass: any,
  klasses: any,
) => {
  return prisma.subClass.upsert({
    create: {
      ...subclass,
      klass: { connect: { id: findIdByName(klassName, klasses) } },
    },
    update: {
      ...subclass,
      klass: { connect: { id: findIdByName(klassName, klasses) } },
    },
    where: {
      name: subclass.name,
    },
  })
}

const seedSubclasses = async (prisma: PrismaClient): Promise<void> => {
  try {
    subclasses.forEach(async (subclass) => {
      const klasses = await prisma.klass.findMany({})

      switch (subclass.name) {
        case 'Arcane Trickster':
        case 'Assassin':
        case 'Inquisitive':
        case 'Mastermind':
        case 'Scout':
        case 'Swashbuckler':
        case 'Thief':
          return updateSubclassByKlass('Rogue', prisma, subclass, klasses)
        case 'Champion':
        case 'Eldritch Knight':
        case 'Arcane Archer':
        case 'Battle Master':
        case 'Cavalier':
        case 'Echo Knight':
        case 'Purple Dragon Knight':
        case 'Samurai':
          return updateSubclassByKlass('Fighter', prisma, subclass, klasses)
        case 'Arcana':
        case 'Death':
        case 'Grave':
        case 'Forge':
        case 'Knowledge':
        case 'Life':
        case 'Light':
        case 'Nature':
        case 'Order':
        case 'Tempest':
        case 'Trickery':
        case 'War':
          return updateSubclassByKlass('Cleric', prisma, subclass, klasses)
        case 'Way of the Drunken Master':
        case 'Way of the Four Elements':
        case 'Way of the Long Death':
        case 'Way of the Open Hand':
        case 'Way of the Kensei':
        case 'Way of Shadow':
        case 'Way of the Sun Soul':
          return updateSubclassByKlass('Monk', prisma, subclass, klasses)
        case 'Wild Magic':
        case 'Shadow Magic':
        case 'Draconic Bloodline':
        case 'Divine Soul':
        case 'Storm Sorcery':
        case 'Phoenix':
          return updateSubclassByKlass('Sorcerer', prisma, subclass, klasses)
        case 'Bladesinging':
        case 'Chronurgy':
        case 'Graviturgy':
        case 'Abjuration':
        case 'Conjuration':
        case 'Divination':
        case 'Enchantment':
        case 'Evocation':
        case 'Illusion':
        case 'Necromancy':
        case 'Transmutation':
        case 'War Magic':
          return updateSubclassByKlass('Wizard', prisma, subclass, klasses)
        case 'College of Eloquence':
        case 'College of Glamour':
        case 'College of Lore':
        case 'College of Swords':
        case 'College of Valor':
        case 'College of Whispers':
          return updateSubclassByKlass('Bard', prisma, subclass, klasses)
        default:
          return null
      }
    })
    console.log('Seed subclasses successfully loaded!')
  } catch (err) {
    console.log(err)
  } finally {
    await prisma.$disconnect()
  }
}

export { seedSpells, seedKlasses, seedSkills, seedSubclasses }
