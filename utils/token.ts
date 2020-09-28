import { parseCookies, setCookie } from 'nookies'

export const getToken = (): string | null => {
  const cookies = parseCookies()

  return cookies.jwt
}

export const saveToken = (token: string): void => {
  setCookie(null, 'jwt', token, { path: '/' })
}
