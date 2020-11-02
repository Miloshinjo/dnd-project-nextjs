import { useState, useEffect, useMemo, useCallback } from 'react'

import { useFilters } from '../../../context/filters'
import { Spell } from '../../../generated/graphql'
import actionTypes from '../../../utils/constants/actionTypes'
import SubHeader from '../../layout/sub-header'
import SubHeaderDesktop from '../../layout/sub-header-desktop'
import Filters from '../../spell/filters'
import SpellsPageHeader from '../../spells/spells-page-header'
import SpellCard from '../spell-card'

import styles from './styles.module.css'

type Props = {
  spells: Array<Spell>
}

const SpellsPage: React.FC<Props> = ({ spells }) => {
  const [filteredSpells, setFilteredSpells] = useState<Array<Spell>>(spells)

  const { filtersState, dispatchFiltersAction } = useFilters()

  useEffect(() => {
    const filtersStateJson = localStorage.getItem('spellFilters')
    if (filtersStateJson) {
      const filtersState = JSON.parse(filtersStateJson)

      dispatchFiltersAction({
        type: actionTypes.READ_FROM_STORAGE,
        payload: {
          storageState: filtersState,
        },
      })
    }
  }, [dispatchFiltersAction])

  const filterByName = useCallback(
    (spells) => {
      if (!filtersState.name) return spells

      return spells.filter((spell) =>
        spell.name.toLowerCase().includes(filtersState.name.toLowerCase()),
      )
    },
    [spells, filtersState.name],
  )

  const filterByLevel = useCallback(
    (spells) => {
      if (!filtersState.levels.length) return spells
      return spells.filter((spell) => filtersState.levels.includes(spell.level))
    },
    [spells, filtersState.levels],
  )

  const filterBySchool = useCallback(
    (spells) => {
      if (!filtersState.school.length) return spells
      return spells.filter((spell) =>
        filtersState.school.includes(spell.school),
      )
    },
    [spells, filtersState.school],
  )

  const filterByKlass = useCallback(
    (spells) => {
      if (!filtersState.klass) return spells
      return spells.filter((spell) =>
        spell.klasses.includes(filtersState.klass),
      )
    },
    [spells, filtersState.klass],
  )

  useEffect(() => {
    if (
      !filtersState.name &&
      !filtersState.levels.length &&
      !filtersState.school.length &&
      !filtersState.klass
    ) {
      setFilteredSpells(spells)
      return
    }

    const filteredSpells = filterByName(
      filterBySchool(filterByLevel(filterByKlass(spells))),
    )

    setFilteredSpells(filteredSpells)
  }, [
    filtersState.name,
    filtersState.levels,
    filtersState.school,
    filtersState.klass,
  ])

  const spellLevels = useMemo(
    () => Array.from(new Set(spells.map((spell) => spell.level))),
    [spells],
  )

  const spellSchools = useMemo(
    () => Array.from(new Set(spells.map((spell) => spell.school))),
    [spells],
  )

  const spellKlasses = [
    'bard',
    'druid',
    'cleric',
    'paladin',
    'wizard',
    'sorcerer',
    'warlock',
    'ranger',
  ]

  return (
    <div className={styles.container}>
      <SubHeader text1="Spells" />
      <SubHeaderDesktop>Spells</SubHeaderDesktop>
      <SpellsPageHeader spellLevels={spellLevels} />
      <div className={styles.contentContainer}>
        <div className={styles.spellsContainer}>
          {filteredSpells.map((spell) => {
            return <SpellCard spell={spell} key={spell.id} />
          })}
        </div>
        <Filters
          levelFilters={filtersState.levels}
          spellLevels={spellLevels as any}
          spellSchools={spellSchools as any}
          schoolFilters={filtersState.school}
          spellKlasses={spellKlasses}
          klassFilter={filtersState.klass}
          dispatch={dispatchFiltersAction}
        />
      </div>
    </div>
  )
}

export { SpellsPage as default }
