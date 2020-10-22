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

  const getHitPointsColor = useMemo(() => {
    if (hitPointsPercent < 25) {
      return 'bg-red-800'
    } else if (hitPointsPercent < 70) {
      return 'bg-orange-500'
    } else {
      return 'bg-green-700'
    }
  }, [hitPointsPercent])

  return (
    <div className={styles.container}>
      <OpenModalButton
        className="w-full flex items-center"
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
            className={`${styles.hitPointsBarInner} ${getHitPointsColor}`}
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
