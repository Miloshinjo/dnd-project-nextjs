import Select from 'react-select'

import { useFilters } from '../../../context/filters'
import actionTypes from '../../../utils/constants/actionTypes'

import styles from './styles.module.css'

type Props = {
  spellLevels: any
}

const SpellsPageHeader: React.FC<Props> = ({ spellLevels }) => {
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
