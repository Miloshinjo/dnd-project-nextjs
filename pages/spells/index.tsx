import { useState, useEffect, useMemo, useCallback, useReducer } from 'react'
import { client } from '../_app'
import Link from 'next/link'

import { Spell } from '../../generated/graphql'
import useDebounce from '../../hooks/useDebounce'

import AppLayout from '../../components/layouts/app-layout'
import SubHeader from '../../components/layout/sub-header'
import Filters from '../../components/spell/filters'

import styles from './styles.module.css'

export const SpellsQuery = `
  query {
    spells {
      id
      name
      level
      school
      klasses
    }
  }
`

export const getSpells = async () => {
  const result = await client.query(SpellsQuery).toPromise()

  if (!result || result.error) {
    console.log(result.error)
    return []
  }

  return result.data.spells
}

type Props = {
  spells: Array<Spell>
}

export const actionTypes = {
  FILTER_BY_NAME: 'FILTER_BY_NAME',
  FILTER_BY_LEVELS: 'FILTER_BY_LEVELS',
  FILTER_BY_SCHOOL: 'FILTER_BY_SCHOOL',
  FILTER_BY_KLASS: 'FILTER_BY_KLASS',
  READ_FROM_STORAGE: 'READ_FROM_STORAGE',
}

const filtersReducer = (state, action) => {
  switch (action.type) {
    case actionTypes.FILTER_BY_NAME:
      return {
        ...state,
        name: action.payload.name,
      }
    case actionTypes.FILTER_BY_LEVELS:
      return {
        ...state,
        levels: action.payload.levels,
      }
    case actionTypes.FILTER_BY_SCHOOL:
      return {
        ...state,
        school: action.payload.school,
      }
    case actionTypes.FILTER_BY_KLASS:
      return {
        ...state,
        klass: action.payload.klass,
      }
    case actionTypes.READ_FROM_STORAGE:
      return {
        ...action.payload.storageState,
      }
    default:
      return state
  }
}

const filtersInitialState = {
  name: '',
  levels: [],
  school: [],
  klass: '',
}

const Spells: React.FC<Props> = ({ spells = [] }) => {
  const [filteredSpells, setFilteredSpells] = useState<Array<Spell>>(spells)

  const [filtersState, dispatch] = useReducer(
    filtersReducer,
    filtersInitialState,
  )

  const debouncedFiltersState = useDebounce(filtersState, 500)

  useEffect(() => {
    const filtersStateJson = localStorage.getItem('spellFilters')
    if (filtersStateJson) {
      const filtersState = JSON.parse(filtersStateJson)

      dispatch({
        type: actionTypes.READ_FROM_STORAGE,
        payload: {
          storageState: filtersState,
        },
      })
    }
  }, [])

  useEffect(() => {
    localStorage.setItem('spellFilters', JSON.stringify(filtersState))
  }, [debouncedFiltersState])

  const search = (e): void => {
    dispatch({
      type: actionTypes.FILTER_BY_NAME,
      payload: {
        name: e.target.value,
      },
    })
  }

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
    <AppLayout title="Spells">
      <div className={styles.container}>
        <SubHeader text1="Spells" />
        <div className={styles.contentContainer}>
          <div className={styles.searchContainer}>
            <input
              value={filtersState.name}
              onChange={search}
              placeholder="Search spells"
              className={styles.searchInput}
            />
          </div>
          <div className={styles.spellsContainer}>
            {filteredSpells.map((spell) => (
              <Link
                href="/spells/[spellId]"
                as={`/spells/${spell.id}`}
                key={spell.id}
              >
                <div className={styles.spellCardContainer}>
                  <div className={styles.spellName}>{spell.name}</div>
                  <div className={styles.spellLevel}>
                    {spell.level === 0 ? 'Cantrip' : `Level ${spell.level}`}
                  </div>
                </div>
              </Link>
            ))}
          </div>
          <Filters
            levelFilters={filtersState.levels}
            spellLevels={spellLevels}
            spellSchools={spellSchools}
            schoolFilters={filtersState.school}
            spellKlasses={spellKlasses}
            klassFilter={filtersState.klass}
            dispatch={dispatch}
          />
        </div>
      </div>
    </AppLayout>
  )
}

export const getStaticProps = async () => {
  const spells: Array<Spell> = await getSpells()

  return {
    revalidate: 1,
    props: {
      spells,
    },
  }
}

export { Spells as default }
