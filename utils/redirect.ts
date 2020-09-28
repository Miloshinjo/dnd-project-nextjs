import Router from 'next/router'
import { NextPageContext } from 'next'

const redirect = (ctx: NextPageContext, route: string) => {
  if (typeof window === 'undefined' && ctx) {
    ctx.res.writeHead(302, { Location: route })
    ctx.res.end()
  } else {
    Router.push(route)
  }
}

export { redirect as default }
