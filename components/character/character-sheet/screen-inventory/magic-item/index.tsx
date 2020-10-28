import { useState, useMemo } from 'react'

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

  const iconType = useMemo(() => {
    switch (magicItem.armorType) {
      case 'Padded':
      case 'Leather':
      case 'Studded Leather':
        return 'LightArmor'
      case 'Hide':
      case 'Chain Shirt':
      case 'Scale Mail':
      case 'Breastplate':
      case 'Half Plate':
        return 'MediumArmor'
      case 'Ring Mail':
      case 'Chain Mail':
      case 'Splint':
      case 'Plate':
        return 'HeavyArmor'
      case 'Shield':
        return 'Shield'
      case 'Robe':
        return 'Robe'
    }
    if (magicItem.weaponType) return magicItem.weaponType
    return magicItem.type
  }, [magicItem])

  const itemType = useMemo(() => {
    if (magicItem.armorType) return magicItem.armorType
    if (magicItem.weaponType) return magicItem.weaponType
    return magicItem.type
  }, [magicItem])

  return (
    <div className={styles.container}>
      <button
        className={styles.button}
        type="button"
        onClick={() => setActive(!isActive)}
      >
        <div className="flex items-center">
          <div className="mr-2">{icons[iconType]}</div>
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
        <div className={styles.itemType}>{itemType}</div>
      </button>
      {isActive && (
        <p className={styles.description}>{magicItem.description}</p>
      )}
    </div>
  )
}

export { MagicItem as default }
