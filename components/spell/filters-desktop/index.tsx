import { Dispatch, useMemo } from 'react'
import { IoIosSearch } from 'react-icons/io'
import Select from 'react-select'

import { useFilters } from '../../../context/filters'
import actionTypes from '../../../utils/constants/actionTypes'

import { colourStyles } from './selectStyles'
import styles from './styles.module.css'

type Props = {
  dispatch: Dispatch<{ type: string; payload: any }>
  spellLevels: Array<number>
  spellSchools: Array<string>
  spellKlasses: Array<string>
}

const FiltersDesktop: React.FC<Props> = ({
  dispatch,
  spellLevels,
  spellSchools,
  spellKlasses,
}) => {
  const { dispatchFiltersAction, filtersState } = useFilters()

  const search = (e): void => {
    dispatchFiltersAction({
      type: actionTypes.FILTER_BY_NAME,
      payload: {
        name: e.target.value,
      },
    })
  }

  const filterLevels = (levels: Array<any>): void => {
    dispatch({
      type: actionTypes.FILTER_BY_LEVELS,
      payload: {
        levels: levels ? levels.map((el) => el.value) : [],
      },
    })
  }

  const filterSchools = (schools: Array<any>): void => {
    dispatch({
      type: actionTypes.FILTER_BY_SCHOOL,
      payload: {
        school: schools ? schools.map((el) => el.value) : [],
      },
    })
  }

  const filterKlasses = (klass: Record<string, string>): void => {
    dispatch({
      type: actionTypes.FILTER_BY_KLASS,
      payload: {
        klass: klass ? klass.value : '',
      },
    })
  }

  const spellLevelsOptions = useMemo(() => {
    return spellLevels.map((level) => {
      return {
        value: level,
        label: level === 0 ? 'Cantrips' : `Level ${level}`,
      }
    })
  }, [spellLevels])

  const spellSchoolOptions = useMemo(() => {
    return spellSchools.map((school) => {
      return {
        value: school,
        label: school,
      }
    })
  }, [spellSchools])

  const spellKlassesOptions = useMemo(() => {
    return spellKlasses.map((klass) => {
      return {
        value: klass,
        label: klass,
      }
    })
  }, [spellKlasses])

  return (
    <div className={styles.container}>
      <label className={styles.searchLabel}>
        <IoIosSearch
          size={22}
          color={
            filtersState.name ? 'var(--text-primary)' : 'var(--text-secondary)'
          }
        />
        <input
          aria-label="Search Spells"
          value={filtersState.name}
          onChange={search}
          placeholder="Search spells"
          className={styles.searchInput}
        />
      </label>
      <div className="mt-4 inline-flex">
        <label className={styles.selectLabel}>
          <span className={styles.selectLabelText}>Class</span>
          <Select
            onChange={filterKlasses}
            styles={colourStyles}
            isClearable={true}
            options={spellKlassesOptions}
            placeholder="Filter by class"
          />
        </label>
        <label className={styles.selectLabel}>
          <span className={styles.selectLabelText}>Level</span>
          <Select
            onChange={filterLevels}
            styles={colourStyles}
            options={spellLevelsOptions}
            isMulti
            placeholder="Filter by Level"
          />
        </label>
        <label className={styles.selectLabel}>
          <span className={styles.selectLabelText}>School of magic</span>
          <Select
            onChange={filterSchools}
            styles={colourStyles}
            options={spellSchoolOptions}
            isMulti
            placeholder="Filter by school"
          />
        </label>
      </div>
    </div>
  )
}

export default FiltersDesktop
