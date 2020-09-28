import * as spell from './spell'
import * as character from './character'
import * as klass from './klass'
import * as subclass from './subclass'
import * as user from './user'
import * as skill from './skill'

export const Query = {
  ...spell,
  ...character,
  ...klass,
  ...user,
  ...skill,
  ...subclass,
}
