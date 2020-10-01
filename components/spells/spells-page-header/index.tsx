import Select from 'react-select'

import actionTypes from '../../../utils/constants/actionTypes'
import { useFilters } from '../../../context/filters'

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
    <div className={styles.spellsHeader}>
      <div className={styles.searchContainer}>
        <input
          value={filtersState.name}
          onChange={search}
          placeholder="Search spells"
          className={styles.searchInput}
        />
      </div>
      <div className="w-full">
        {/* <Select
          options={spellLevels.map((level) => {
            return {
              label: level,
              value: level,
            }
          })}
          closeMenuOnSelect={false}
          isMulti
          styles={{
            control: (
              styles,
              { data, isDisabled, isFocused, isSelected, isHovered },
            ) => ({
              ...styles,
              cursor: 'pointer',
              border: '1px solid transparent',
              boxShadow: isFocused
                ? '0 0 0 3px rgba(66, 153, 225, 0.5) !important'
                : 'none',
              backgroundColor: '#2d3748',
              '&:hover': {},
            }),
            option: (styles, { data, isDisabled, isFocused, isSelected }) => ({
              ...styles,
              cursor: 'pointer',
              backgroundColor: isFocused ? '#2d3748' : '#2d3748',
              color: isSelected ? '#000' : '',
            }),
          }}
        /> */}
      </div>
    </div>
  )
}

export { SpellsPageHeader as default }
