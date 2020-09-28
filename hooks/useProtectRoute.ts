import { useEffect } from 'react'
import Router from 'next/router'
import { parseCookies } from 'nookies'

const useProtectRoute = () => {
  useEffect(() => {
    const cookies = parseCookies(null)

    if (!cookies.jwt) {
      Router.push('/login')
    }
  }, [])
}

export { useProtectRoute as default }
