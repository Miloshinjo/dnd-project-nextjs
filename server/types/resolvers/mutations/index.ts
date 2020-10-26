import * as character from './character'
import * as magicItem from './magicItem'

export * from './inputs'

export const Mutation = {
  ...character,
  ...magicItem,
}
