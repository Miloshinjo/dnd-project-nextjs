import { Spell } from '../generated/graphql'

const formatCastingTimes = (castingTime: Spell['castingTime']): string => {
  switch (castingTime) {
    case '1 Action':
      return '1A'
    case '1 Bonus Action':
      return '1BA'
    case 'Reaction':
      return 'Re'
  }
}

export { formatCastingTimes }
