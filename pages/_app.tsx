import { AppProps } from 'next/app'
import {
  Provider as UrqlProvider,
  createClient,
  dedupExchange,
  fetchExchange,
} from 'urql'
import { Provider as SessionProvider } from 'next-auth/client'

import cache from '../utils/cache'

const isDev = process.env.NODE_ENV !== 'production'

const url = isDev
  ? 'http://localhost:3000/api/graphql'
  : 'https://dnd-project-nextjs.vercel.app/api/graphql'

import '../styles/index.css'

export const client = createClient({
  url,
  exchanges: [dedupExchange, cache, fetchExchange],
})

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <UrqlProvider value={client}>
      <SessionProvider session={pageProps.session}>
        <Component {...pageProps} />
      </SessionProvider>
    </UrqlProvider>
  )
}

export default MyApp
