import { useState, Dispatch, SetStateAction } from 'react'
import { motion } from 'framer-motion'
import { FiChevronUp } from 'react-icons/fi'
import { actionTypes } from '../../../pages/spells'

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
  open: { y: 0, transition: { type: 'tween', fade: 'fadeIn', duration: 0.1 } },
  closed: {
    y: 310,
    transition: { type: 'tween', fade: 'fadeOut', duration: 0.1 },
  },
}

const arrowVariants = {
  open: {
    rotate: '-180deg',
    transition: { type: 'tween', duration: 0.3 },
  },
  closed: {
    rotate: 0,
    transition: { type: 'tween', duration: 0.3 },
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
        className="mb-4 flex justify-between items-center w-full h-8 px-4"
        onClick={() => {
          setOpen(!open)
        }}
      >
        <h4 className="text-sm font-bold">Filters</h4>
        <motion.span
          variants={arrowVariants}
          animate={open ? 'open' : 'closed'}
        >
          <FiChevronUp size={20} />
        </motion.span>
      </button>

      <div className="flex pb-4 px-4 flex-col">
        <h3 className="text-xs  mb-2">Level</h3>
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
      <div className="flex pb-4 px-4 flex-col">
        <h3 className="text-xs mb-2">Spell School</h3>
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
      <div className="flex pb-4 px-4 flex-col">
        <h3 className="text-xs mb-2">Class</h3>
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
