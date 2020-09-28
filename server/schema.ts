// eslint-disable-next-line @typescript-eslint/triple-slash-reference
/// <reference path="./generated/nexus.ts" />

import path from 'path';
import * as types from './types';

import { makeSchema } from '@nexus/schema';
import { nexusSchemaPrisma } from 'nexus-plugin-prisma/schema';

export const schema = makeSchema({
  types,
  plugins: [nexusSchemaPrisma()],
  outputs: {
    typegen: path.join(__dirname, './generated/nexus.ts'),
    schema: path.join(__dirname, './schema.graphql'),
  },
});
