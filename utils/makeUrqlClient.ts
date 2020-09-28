import { createClient, dedupExchange, fetchExchange } from 'urql';

import cache from './cache';

const isDev = process.env.NODE_ENV !== 'production';

const url = isDev
  ? 'http://localhost:3000/api/graphql'
  : 'https://dnd-armory.herokuapp.com/api/graphql';

const makeClient = () => {
  return createClient({
    url,
    fetchOptions: () => {
      return {
        credentials: 'same-origin',
      };
    },
    exchanges: [dedupExchange, cache, fetchExchange],
  });
};

export { makeClient as default };
