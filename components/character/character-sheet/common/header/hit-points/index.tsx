import { useMemo } from 'react'
import {
  Character,
  useHitPointsMutation,
  useMaxHitPointsMutation,
} from '../../../../../../generated/graphql'
import { useModal } from '../../../../../../context/modal'

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
  const { openModal } = useModal()

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
      <div className={styles.hitPointsContainer}>
        <div className={styles.hitPointsLabel}>HP</div>
        <div className={styles.hitPointsBar}>
          <div
            className={`${styles.hitPointsBarInner} ${getHitPointsColor}`}
            style={{
              width: `${hitPointsPercent}%`,
            }}
          />
        </div>
        <div className="flex items-center">
          <button
            type="button"
            className={styles.hitPoints}
            onClick={() =>
              openModal({
                type: 'number',
                props: {
                  originalValue: hitPoints,
                  characterId,
                  title: 'Hit Points',
                  type: 'hitPoints',
                  mutation: useHitPointsMutation,
                },
              })
            }
          >
            {hitPoints}
          </button>
          <span className="mx-1">/</span>
          <button
            type="button"
            className="font-bold"
            onClick={() =>
              openModal({
                type: 'number',
                props: {
                  originalValue: maxHitPoints,
                  characterId,
                  title: 'Max Hit Points',
                  type: 'maxHitPoints',
                  mutation: useMaxHitPointsMutation,
                },
              })
            }
          >
            {maxHitPoints}
          </button>
        </div>
      </div>
    </div>
  )
}

export { HitPoints as default }
