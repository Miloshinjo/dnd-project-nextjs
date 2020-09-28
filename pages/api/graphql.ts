import { ApolloServer } from 'apollo-server-micro';
import { applyMiddleware } from 'graphql-middleware';

import { schema } from '../../server/schema';
import permissions from '../../server/permissions';
import createContext from '../../server/utils/context';

const apolloServer = new ApolloServer({
  schema: applyMiddleware(schema, permissions),
  context: createContext,
  playground: {
    settings: {
      'request.credentials': 'same-origin',
    },
  },
});

export const config = {
  api: {
    bodyParser: false,
  },
};

export default apolloServer.createHandler({ path: '/api/graphql' });
