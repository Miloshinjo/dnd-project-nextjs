import { AppProps } from 'next/app'
import {
  Provider as UrqlProvider,
  createClient,
  dedupExchange,
  fetchExchange,
} from 'urql'
import { Provider as SessionProvider } from 'next-auth/client'

import cache from '../utils/cache'

import '../styles/index.css'

const url = process.env.NEXT_PUBLIC_GRAPHQL_URL

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
