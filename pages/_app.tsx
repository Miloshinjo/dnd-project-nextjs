import { AppProps } from 'next/app'
import { Provider, createClient, dedupExchange, fetchExchange } from 'urql'

import cache from '../utils/cache'

const isDev = process.env.NODE_ENV !== 'production'

const url = isDev
  ? 'http://localhost:3000/api/graphql'
  : 'https://dnd-armory.herokuapp.com/api/graphql'

import '../styles/index.css'

export const client = createClient({
  url,
  fetchOptions: () => {
    return {
      credentials: 'same-origin',
    }
  },
  exchanges: [dedupExchange, cache, fetchExchange],
})

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Provider value={client}>
      <Component {...pageProps} />
    </Provider>
  )
}

export default MyApp
