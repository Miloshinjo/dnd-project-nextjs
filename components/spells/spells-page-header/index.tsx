import { useFilters } from '../../../context/filters'
import actionTypes from '../../../utils/constants/actionTypes'

import styles from './styles.module.css'

const SpellsPageHeader: React.FC = () => {
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
      <div className={styles.searchContainer}>
        <input
          value={filtersState.name}
          onChange={search}
          placeholder="Search spells"
          className={styles.searchInput}
        />
      </div>
    </div>
  )
}

export { SpellsPageHeader as default }
