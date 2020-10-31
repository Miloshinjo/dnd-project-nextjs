import { useState, useMemo } from 'react'

import { useModal } from '../../../../../context/modal'
import {
  MagicItem as MagicItemType,
  Character,
} from '../../../../../generated/graphql'

import DeleteButton from '../../../../buttons/delete-button'

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
  const { openModal } = useModal()

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
        style={{
          borderColor: magicItemColors[magicItem.rarity],
          borderWidth: '2px',
          borderBottom: 'none',
          borderTop: 'none',
          borderRight: 'none',
        }}
      >
        <div className="flex items-center">
          <div className={styles.icon}>{icons[iconType]}</div>
          <div className={styles.title}>
            <h4 className={styles.itemName}>{magicItem.name}</h4>

            <div className={styles.itemInfo}>
              <span className={styles.itemType}>{itemType}, </span>
              <span className={styles.itemRarity}>{magicItem.rarity}</span>
              {magicItem.attunement && (
                <span className={styles.attuned}> (attuned)</span>
              )}
            </div>
          </div>
        </div>
      </button>
      {isActive && (
        <div
          className={styles.bottomPart}
          style={{
            borderColor: magicItemColors[magicItem.rarity],
            borderWidth: '2px',
            borderBottom: 'none',
            borderTop: 'none',
            borderRight: 'none',
          }}
        >
          <p className={styles.description}>{magicItem.description}</p>

          <DeleteButton
            onClick={() => {
              openModal({
                type: 'deleteMagicItem',
                props: {
                  magicItemId: magicItem.id,
                  name: magicItem.name,
                },
              })
            }}
          >
            Delete item
          </DeleteButton>
        </div>
      )}
    </div>
  )
}

export { MagicItem as default }
