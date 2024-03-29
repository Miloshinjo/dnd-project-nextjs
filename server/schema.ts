// eslint-disable-next-line @typescript-eslint/triple-slash-reference
/// <reference path="../generated/nexus.ts" />

import * as path from 'path'
import * as types from './types'

import { makeSchema } from '@nexus/schema'
import { nexusSchemaPrisma } from 'nexus-plugin-prisma/schema'

export const schema = makeSchema({
  types,
  plugins: [nexusSchemaPrisma()],
  outputs: {
    typegen: path.join(process.cwd(), './server/generated/nexus.ts'),
    schema: path.join(process.cwd(), './schema.graphql'),
  },
})
