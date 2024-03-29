import { motion } from 'framer-motion'
import { useState, Dispatch } from 'react'

import actionTypes from '../../../utils/constants/actionTypes'

import styles from './styles.module.css'

type Props = {
  spellLevels: Array<number>
  levelFilters: Array<number>
  spellSchools: Array<string>
  schoolFilters: Array<string>
  spellKlasses: Array<string>
  klassFilter: string
  dispatch: Dispatch<{ type: string; payload: any }>
}

const filtersVariants = {
  open: { y: 0, transition: {} },
  closed: {
    y: 310,
    transition: {},
  },
}

const Filters: React.FC<Props> = ({
  spellLevels,
  levelFilters,
  dispatch,
  spellSchools,
  schoolFilters,
  spellKlasses,
  klassFilter,
}) => {
  const [open, setOpen] = useState<boolean>(false)

  const filterLevels = (level: number): void => {
    if (levelFilters.includes(level)) {
      dispatch({
        type: actionTypes.FILTER_BY_LEVELS,
        payload: {
          levels: levelFilters.filter((el) => el !== level),
        },
      })
      return
    }

    dispatch({
      type: actionTypes.FILTER_BY_LEVELS,
      payload: {
        levels: [...levelFilters, level],
      },
    })
  }

  const filterSchools = (school: string): void => {
    if (schoolFilters.includes(school)) {
      dispatch({
        type: actionTypes.FILTER_BY_SCHOOL,
        payload: {
          school: schoolFilters.filter((el) => el !== school),
        },
      })
      return
    }

    dispatch({
      type: actionTypes.FILTER_BY_SCHOOL,
      payload: {
        school: [...schoolFilters, school],
      },
    })
  }

  const filterKlasses = (klass: string): void => {
    if (klassFilter === klass) {
      dispatch({
        type: actionTypes.FILTER_BY_KLASS,
        payload: {
          klass: '',
        },
      })
      return
    }

    dispatch({
      type: actionTypes.FILTER_BY_KLASS,
      payload: {
        klass,
      },
    })
  }

  return (
    <motion.div
      className={styles.container}
      variants={filtersVariants}
      animate={open ? 'open' : 'closed'}
    >
      <button
        className={styles.filtersButton}
        onClick={() => {
          setOpen(!open)
        }}
      >
        Filters
      </button>

      <div className={styles.filtersContent}>
        <h3 className="text-xs my-2 font-bold">Level</h3>
        <div className={styles.levelsFiltersContainer}>
          {spellLevels.map((level) => {
            return (
              <button
                key={level}
                className={
                  levelFilters.includes(level)
                    ? styles.levelFilterSelected
                    : styles.levelFilter
                }
                onClick={() => filterLevels(level)}
              >
                {level}
              </button>
            )
          })}
        </div>
      </div>
      <div className={styles.filtersContent}>
        <h3 className="text-xs mb-2 font-bold">Spell School</h3>
        <div className={styles.schoolsFiltersContainer}>
          {spellSchools.map((school) => {
            return (
              <button
                key={school}
                className={
                  schoolFilters.includes(school)
                    ? styles.schoolFilterSelected
                    : styles.schoolFilter
                }
                onClick={() => filterSchools(school)}
              >
                {school}
              </button>
            )
          })}
        </div>
      </div>
      <div className={styles.filtersContent}>
        <h3 className="text-xs mb-2 font-bold">Class</h3>
        <div className={styles.klassesFiltersContainer}>
          {spellKlasses.map((klass) => {
            return (
              <button
                key={klass}
                className={
                  klassFilter === klass
                    ? styles.klassFilterSelected
                    : styles.klassFilter
                }
                onClick={() => filterKlasses(klass)}
              >
                {klass}
              </button>
            )
          })}
        </div>
      </div>
    </motion.div>
  )
}

export { Filters as default }
