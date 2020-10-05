import {
  Character,
  useArcaneWardMutation,
  useArcaneWardMaxMutation,
} from '../../../../../../generated/graphql'
import { useModal } from '../../../../../../context/modal'
import { FiShield } from 'react-icons/fi'

import styles from './styles.module.css'

type Props = {
  characterId: Character['id']
  arcaneWard: Character['arcaneWard']
  arcaneWardMax: Character['arcaneWardMax']
}

const ArcaneWard: React.FC<Props> = ({
  characterId,
  arcaneWard,
  arcaneWardMax,
}) => {
  const { openModal } = useModal()

  const arcaneWardPercent = Math.round((arcaneWard / arcaneWardMax) * 100)

  return (
    <div className={styles.container}>
      <div className={styles.arcaneWardContainer}>
        <div className={styles.arcaneWardLabel}>
          <FiShield size={15} />
        </div>
        <div className={styles.arcaneWardBar}>
          <div
            className={`${styles.arcaneWardBarInner}`}
            style={{
              width: `${arcaneWardPercent}%`,
            }}
          />
        </div>
        <div className="flex items-center ml-4">
          <button
            type="button"
            className={styles.arcaneWard}
            onClick={() =>
              openModal({
                type: 'number',
                props: {
                  originalValue: arcaneWard,
                  characterId,
                  title: 'Arcane Ward',
                  type: 'arcaneWard',
                  mutation: useArcaneWardMutation,
                },
              })
            }
          >
            {arcaneWard || 0}
          </button>
          <span className="mx-1">/</span>
          <button
            type="button"
            className={styles.maxArcaneWard}
            onClick={() =>
              openModal({
                type: 'number',
                props: {
                  originalValue: arcaneWardMax,
                  characterId,
                  title: 'Arcane Ward Max',
                  type: 'arcaneWardMax',
                  mutation: useArcaneWardMaxMutation,
                },
              })
            }
          >
            {arcaneWardMax || 0}
          </button>
        </div>
      </div>
    </div>
  )
}

export { ArcaneWard as default }
