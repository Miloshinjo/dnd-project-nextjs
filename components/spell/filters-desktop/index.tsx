import { IoIosSearch } from 'react-icons/io'

import { useFilters } from '../../../context/filters'
import actionTypes from '../../../utils/constants/actionTypes'

import styles from './styles.module.css'

const FiltersDesktop: React.FC = () => {
  const { dispatchFiltersAction, filtersState } = useFilters()

  const search = (e): void => {
    dispatchFiltersAction({
      type: actionTypes.FILTER_BY_NAME,
      payload: {
        name: e.target.value,
      },
    })
  }

  return (
    <div className={styles.container}>
      <label className={styles.searchLabel}>
        <IoIosSearch size={22} color="var(--text-secondary)" />
        <input
          aria-label="Search Spells"
          value={filtersState.name}
          onChange={search}
          placeholder="Search spells"
          className={styles.searchInput}
        />
      </label>
    </div>
  )
}

export default FiltersDesktop
