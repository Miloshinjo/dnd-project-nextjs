import { Spell } from '../../../generated/graphql'
import { GiMusicSpell, GiHand, GiSwapBag } from 'react-icons/gi'

import styles from './styles.module.css'

type Props = {
  castingTime: Spell['castingTime']
  duration: Spell['duration']
  range: Spell['range']
  components: Spell['components']
  attackSave: Spell['attackSave']
  damageEffect: Spell['damageEffect']
}

const SpellInfo: React.FC<Props> = ({
  castingTime,
  duration,
  range,
  components,
  attackSave,
  damageEffect,
}) => {
  return (
    <div className={styles.container}>
      <div className={styles.spellInfo}>
        <div className={styles.spellInfoLabel}>Casting time</div>
        <div className={styles.spellInfoValue}>{castingTime}</div>
      </div>
      <div className={styles.spellInfo}>
        <div className={styles.spellInfoLabel}>Duration</div>
        <div className={styles.spellInfoValue}>{duration}</div>
      </div>
      <div className={styles.spellInfo}>
        <div className={styles.spellInfoLabel}>Range</div>
        <div className={styles.spellInfoValue}>{range}</div>
      </div>
      <div className={styles.spellInfo}>
        <div className={styles.spellInfoLabel}>Components</div>
        <div
          className={`${styles.spellInfoValue} ${styles.spellInfoValueComponents}`}
        >
          {components.split(',').map((component) =>
            component === 'v' ? (
              <span className={styles.spellInfoComponentsIcon} key="v">
                <GiMusicSpell />
              </span>
            ) : component === 's' ? (
              <span className={styles.spellInfoComponentsIcon} key="s">
                <GiHand />
              </span>
            ) : (
              <span className={styles.spellInfoComponentsIcon} key="m">
                <GiSwapBag />
              </span>
            ),
          )}
        </div>
      </div>
      <div className={styles.spellInfo}>
        <div className={styles.spellInfoLabel}>Attack/Save</div>
        <div className={styles.spellInfoValue}>{attackSave}</div>
      </div>
      <div className={styles.spellInfo}>
        <div className={styles.spellInfoLabel}>Damage/Effect</div>
        <div className={styles.spellInfoValue}>{damageEffect}</div>
      </div>
    </div>
  )
}

export { SpellInfo as default }
