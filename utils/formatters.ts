import { Spell } from '../generated/graphql'

const formatCastingTimes = (castingTime: Spell['castingTime']): string => {
  switch (castingTime) {
    case '1 Action':
      return '1A'
    case '1 Bonus Action':
      return '1BA'
    case '1 Minute':
      return '1m'
    case '10 Minutes':
      return '10m'
    case 'Reaction':
      return 'Re'
  }
}

export { formatCastingTimes }
