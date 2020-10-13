import React, {
  Dispatch,
  SetStateAction,
  useContext,
  useReducer,
  useEffect,
} from 'react'

import useDebounce from '../hooks/useDebounce'

import actionTypes from '../utils/constants/actionTypes'

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

type FilterContextTypes = {
  filtersState: {
    name: string
    levels: Array<number>
    school: Array<string>
    klass: string
  }
  dispatchFiltersAction: Dispatch<SetStateAction<any>>
}

const FiltersContext = React.createContext({} as FilterContextTypes)

const FiltersProvider: React.FC = ({ children }) => {
  const [filtersState, dispatchFiltersAction] = useReducer(
    filtersReducer,
    filtersInitialState,
  )

  const debouncedFiltersState = useDebounce(filtersState, 500)

  useEffect(() => {
    localStorage.setItem('spellFilters', JSON.stringify(filtersState))
  }, [debouncedFiltersState])

  return (
    <FiltersContext.Provider
      value={{
        filtersState,
        dispatchFiltersAction,
      }}
    >
      {children}
    </FiltersContext.Provider>
  )
}

const useFilters = (): FilterContextTypes => useContext(FiltersContext)

export { FiltersProvider as default, useFilters }
