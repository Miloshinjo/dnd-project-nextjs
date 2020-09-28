import jwt from 'jsonwebtoken';
import { PrismaClient } from '@prisma/client';
import { Request } from 'apollo-server-express';

import { JWT_SECRET, tokens } from './constants';
// import { seedSpells, seedKlasses, seedSkills, seedSubclasses } from './seed'

export interface Context {
  prisma: PrismaClient;
  req: Request;
  userId: number;
}

const prisma = new PrismaClient();

// seedSpells(prisma)
// seedSkills(prisma)
// seedKlasses(prisma)
// seedSubclasses(prisma)

const createContext = (ctx: any): Context => {
  let userId: string | null = null;

  try {
    const cookie = ctx.req.cookies['jwt'];

    if (cookie) {
      const decoded: any = jwt.verify(cookie, JWT_SECRET as string);

      if (!decoded.userId && decoded.type !== tokens.access.name) {
        userId = null;
      } else {
        userId = decoded.userId;
      }
    }
  } catch (_) {
    userId = null;
  }

  return {
    ...ctx,
    prisma,
    res: ctx.res,
    userId,
  };
};

export { createContext as default };
