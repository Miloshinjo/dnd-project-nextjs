import { PrismaClient } from '@prisma/client'
import { Request } from 'apollo-server-express'

import { seedSpells, seedKlasses, seedSkills, seedSubclasses } from './seed'

export interface Context {
  prisma: PrismaClient
  req: Request
  userId: number
}

export let prisma

if (process.env.NODE_ENV === 'production') {
  prisma = new PrismaClient()
} else {
  if (!(global as any).prisma) {
    ;(global as any).prisma = new PrismaClient()
  }
  prisma = (global as any).prisma
}

// seedSpells(prisma)
// seedSkills(prisma)
// seedKlasses(prisma)
// seedSubclasses(prisma)

const createContext = (ctx: any): Context => {
  return {
    ...ctx,
    prisma,
    res: ctx.res,
    req: ctx.req,
  }
}

export { createContext as default }
