import { useMemo } from 'react'

import {
  Character,
  useHitPointsMutation,
  useMaxHitPointsMutation,
} from '../../../../../../generated/graphql'
import OpenModalButton from '../../../../../buttons/open-modal-button'

import styles from './styles.module.css'

type Props = {
  characterId: Character['id']
  hitPoints: Character['hitPoints']
  maxHitPoints: Character['maxHitPoints']
}

const HitPoints: React.FC<Props> = ({
  characterId,
  hitPoints,
  maxHitPoints,
}) => {
  const hitPointsPercent = Math.round((hitPoints / maxHitPoints) * 100)

  const hitPointsColor = useMemo(() => {
    if (hitPointsPercent < 25) {
      return 'colorRed'
    } else if (hitPointsPercent < 70) {
      return 'colorYellow'
    } else {
      return 'colorGreen'
    }
  }, [hitPointsPercent])

  return (
    <div className={styles.container}>
      <OpenModalButton
        className={styles.hitPointsContainer}
        type="number"
        props={{
          originalValue: hitPoints,
          characterId,
          title: 'Hit Points',
          type: 'hitPoints',
          mutation: useHitPointsMutation,
        }}
      >
        <div className={styles.hitPointsLabel}>HP</div>
        <div className={styles.hitPointsBar}>
          <div
            className={`${styles.hitPointsBarInner} ${styles[hitPointsColor]}`}
            style={{
              width: `${hitPointsPercent}%`,
            }}
          />
        </div>

        <div className={styles.hitPoints}>{hitPoints}</div>
      </OpenModalButton>
      <span className="mx-1">/</span>
      <OpenModalButton
        type="number"
        className="font-bold"
        props={{
          originalValue: maxHitPoints,
          characterId,
          title: 'Max Hit Points',
          type: 'maxHitPoints',
          mutation: useMaxHitPointsMutation,
        }}
      >
        {maxHitPoints}
      </OpenModalButton>
    </div>
  )
}

export { HitPoints as default }
