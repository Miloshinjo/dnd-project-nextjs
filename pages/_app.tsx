import { AppProps } from 'next/app'
import {
  Provider as UrqlProvider,
  createClient,
  dedupExchange,
  fetchExchange,
} from 'urql'
import { Provider as SessionProvider } from '../lib/next-auth/client'
import { ThemeProvider } from 'next-themes'

import cache from '../utils/cache'

import '../styles/index.css'

const url = process.env.NEXT_PUBLIC_GRAPHQL_URL

export const client = createClient({
  url,
  exchanges: [dedupExchange, cache, fetchExchange],
})

const MyApp: React.FC<AppProps> = ({ Component, pageProps }) => {
  return (
    <UrqlProvider value={client}>
      <SessionProvider session={pageProps.session}>
        <ThemeProvider>
          <Component {...pageProps} />
        </ThemeProvider>
      </SessionProvider>
    </UrqlProvider>
  )
}

export default MyApp
