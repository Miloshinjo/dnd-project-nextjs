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
        case 'Beastmaster':
        case 'Gloom Stalker':
        case 'Horizon Walker':
        case 'Hunter':
        case 'Monster Slayer':
          return updateSubclassByKlass('Ranger', prisma, subclass, klasses)
        case 'Oath of Conquest':
        case 'Oath of Devotion':
        case 'Oath of Redemption':
        case 'Oath of the Ancients':
        case 'Oath of the Crown':
        case 'Oath of Glory':
        case 'Oath of Vengeance':
        case 'Oathbreaker':
          return updateSubclassByKlass('Paladin', prisma, subclass, klasses)
        case 'The Archfey':
        case 'The Celestial':
        case 'The Fiend':
        case 'The Great Old One':
        case 'The Undying':
          return updateSubclassByKlass('Warlock', prisma, subclass, klasses)
        case 'Ancestral Guardian':
        case 'Battlerager':
        case 'Berserker':
        case 'Storm Herald':
        case 'Totem Warrior':
        case 'Zealot':
          return updateSubclassByKlass('Barbarian', prisma, subclass, klasses)
        case 'Circle of Dreams':
        case 'Circle of the Land':
        case 'Circle of the Moon':
        case 'Circle of the Shepherd':
        case 'Circle of Spores':
          return updateSubclassByKlass('Druid', prisma, subclass, klasses)
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
