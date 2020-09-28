import fs from 'fs'
import { PrismaClient } from '@prisma/client'

const spells = JSON.parse(
  fs.readFileSync(`${__dirname}/../__seed__/spells.json`, 'utf-8')
)
const klasses = JSON.parse(
  fs.readFileSync(`${__dirname}/../__seed__/klasses.json`, 'utf-8')
)

const subclasses = JSON.parse(
  fs.readFileSync(`${__dirname}/../__seed__/subclasses.json`, 'utf-8')
)
const skills = JSON.parse(
  fs.readFileSync(`${__dirname}/../__seed__/skills.json`, 'utf-8')
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
  klasses: any
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
          return updateSubclassByKlass('Monk', prisma, subclass, klasses)
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
