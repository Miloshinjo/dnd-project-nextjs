import { useState } from 'react'
import { useRouter } from 'next/router'
import { useModal } from '../../../context/modal'
import ConcentrationRitual from '../../spell/concentration-ritual'
import { Spell } from '../../../generated/graphql'
import Description from '../../spell/description'
import Info from '../../spell/info'
import Klasses from '../../spell/klasses'
import AddButton from '../../buttons/add-button'

import styles from './styles.module.css'

type Props = {
  spell: Spell
}

const SpellCard: React.FC<Props> = ({ spell }) => {
  const [active, setActive] = useState(false)
  const { query } = useRouter()

  const { openModal } = useModal()

  return (
    <div className={styles.container}>
      <button
        type="button"
        onClick={() => {
          // setActive(!active)
          openModal({
            type: 'spellPage',
            props: {
              spellId: spell.id,
              spellName: spell.name,
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

      {active && (
        <div className={styles.bottomPart}>
          <div>
            <ConcentrationRitual
              concentration={spell.concentration}
              ritual={spell.ritual}
            />
            <Info
              castingTime={spell.castingTime}
              duration={spell.duration}
              range={spell.range}
              components={spell.components}
              attackSave={spell.attackSave}
              damageEffect={spell.damageEffect}
            />
            <Description description={spell.description} />
            <Klasses klasses={spell.klasses} />
            <div className="my-4" />

            {query?.character ? (
              <AddButton
                onClick={() => {
                  openModal({
                    type: 'learnSpell',
                    props: {
                      spellId: spell.id,
                    },
                  })
                }}
              >
                Add to character
              </AddButton>
            ) : null}
          </div>
        </div>
      )}
    </div>
  )
}

export { SpellCard as default }
