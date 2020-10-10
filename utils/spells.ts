import { NextRouter } from 'next/router'
import { Character } from '../generated/graphql'

const arrangeSpellsByLevel = (spells) => {
  return spells.reduce((total, current) => {
    if (!total[current.level]) {
      total[current.level] = []
    }
    total[current.level].push(current)

    return total
  }, {})
}

type Props = {
  klassName: string
  characterId: Character['id']
  router: NextRouter
}

const seeAllSpellsForKlass = ({
  klassName,
  characterId,
  router,
}: Props): void => {
  const spellsFiltersJson = localStorage.getItem('spellFilters')
  const spellsFilters = JSON.parse(spellsFiltersJson)
  spellsFilters.klass = klassName

  localStorage.setItem('spellFilters', JSON.stringify(spellsFilters))

  router.push(`/spells?character=${characterId}`)
}

export { arrangeSpellsByLevel, seeAllSpellsForKlass }
