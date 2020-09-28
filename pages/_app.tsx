import { AppProps } from 'next/app'

import ClientProvider from '../context/urqlClient'
import makeClient from '../utils/makeUrqlClient'

import '../styles/index.css'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ClientProvider makeClient={makeClient}>
      <Component {...pageProps} />
    </ClientProvider>
  )
}

export default MyApp
