import { useModal } from '../../../context/modal'
import { Spell } from '../../../generated/graphql'

import styles from './styles.module.css'

type Props = {
  spell: Spell
}

const SpellCard: React.FC<Props> = ({ spell }) => {
  const { openModal } = useModal()

  return (
    <div className={styles.container}>
      <button
        type="button"
        onClick={() => {
          openModal({
            type: 'spellPageStatic',
            props: {
              id: spell.id,
              name: spell.name,
              attackSave: spell.attackSave,
              castingTime: spell.castingTime,
              components: spell.components,
              material: spell.material,
              concentration: spell.concentration,
              damageEffect: spell.damageEffect,
              description: spell.description,
              duration: spell.duration,
              klasses: spell.klasses,
              range: spell.range,
              ritual: spell.ritual,
              level: spell.level,
              school: spell.school,
            },
          })
        }}
        className={styles.button}
      >
        <div className="leading-tight text-left">
          <div className={styles.spellName}>{spell.name}</div>
          <div className={styles.spellSchool}>{spell.school}</div>
        </div>
        <div className={styles.spellLevel}>
          {spell.level === 0 ? <span>Cantrip</span> : `Level ${spell.level}`}
        </div>
      </button>
    </div>
  )
}

export { SpellCard as default }
