import { useEffect } from 'react'
import Router from 'next/router'
import { parseCookies } from 'nookies'

const useRedirectFromAuth = () => {
  useEffect(() => {
    const cookies = parseCookies(null)

    if (cookies.jwt) {
      Router.push('/app')
    }
  }, [])
}

export { useRedirectFromAuth as default }
