import { useState } from 'react'

import { MagicItem as MagicItemType } from '../../../../../generated/graphql'

import icons from './icons'

import styles from './styles.module.css'

type Props = {
  magicItem: MagicItemType
}

const magicItemColors = {
  Uncommon: 'var(--color-uncommon)',
  Common: 'var(--text-primary)',
  Rare: 'var(--color-rare)',
  'Very rare': 'var(--color-very-rare)',
  Legendary: 'var(--color-legendary)',
  Artifact: 'var(--color-artifact)',
  Varies: 'var(--color-varies)',
  Unknown: 'var(--color-unknown)',
}

const MagicItem: React.FC<Props> = ({ magicItem }) => {
  const [isActive, setActive] = useState(false)

  return (
    <div className={styles.container}>
      <button
        className={styles.button}
        type="button"
        onClick={() => setActive(!isActive)}
      >
        <div className="flex items-center">
          <div className="mr-2">{icons[magicItem.type]}</div>
          <div className={styles.title}>
            <h4 className={styles.itemName}>{magicItem.name}</h4>
            <h5
              className={styles.itemRarity}
              style={{
                color: magicItemColors[magicItem.rarity],
              }}
            >
              {magicItem.rarity}
            </h5>
          </div>
        </div>
        <div className={styles.itemType}>{magicItem.type}</div>
      </button>
      {isActive && (
        <p className={styles.description}>{magicItem.description}</p>
      )}
    </div>
  )
}

export { MagicItem as default }
