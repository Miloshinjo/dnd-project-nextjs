import { FiShield } from 'react-icons/fi'

import {
  Character,
  useArcaneWardMutation,
  useArcaneWardMaxMutation,
} from '../../../../../../generated/graphql'
import OpenModalButton from '../../../../../buttons/open-modal-button'

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
  const arcaneWardPercent = Math.round((arcaneWard / arcaneWardMax) * 100)

  return (
    <div className={styles.container}>
      <OpenModalButton
        className={styles.arcaneWardContainer}
        type="number"
        props={{
          originalValue: arcaneWard,
          characterId,
          title: 'Arcane Ward',
          type: 'arcaneWard',
          mutation: useArcaneWardMutation,
        }}
      >
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
        <div className={styles.arcaneWard}>{arcaneWard || 0}</div>
      </OpenModalButton>
      <span className="mx-1">/</span>
      <OpenModalButton
        type="number"
        className={styles.maxArcaneWard}
        props={{
          originalValue: arcaneWardMax,
          characterId,
          title: 'Arcane Ward Size',
          type: 'arcaneWardMax',
          mutation: useArcaneWardMaxMutation,
        }}
      >
        {arcaneWardMax || 0}
      </OpenModalButton>
    </div>
  )
}

export { ArcaneWard as default }
