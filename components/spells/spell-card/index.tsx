import { motion } from 'framer-motion'
import { useState } from 'react'

import { useModal } from '../../../context/modal'
import { Spell } from '../../../generated/graphql'
import useBigScreen from '../../../hooks/useBigScreen'

import SpellConcentrationRitual from '../../spell/concentration-ritual'
import SpellDescription from '../../spell/description'
import SpellInfo from '../../spell/info'
import SpellKlasses from '../../spell/klasses'
import SpellMaterial from '../../spell/material'

import styles from './styles.module.css'

type Props = {
  spell: Spell
}

const SpellCard: React.FC<Props> = ({ spell }) => {
  const {
    level,
    name,
    attackSave,
    castingTime,
    components,
    material,
    concentration,
    damageEffect,
    description,
    duration,
    klasses,
    range,
    ritual,
    school,
  } = spell
  const { openModal } = useModal()
  const [isOpen, setOpen] = useState(false)
  const isBigScreen = useBigScreen()

  const handleSpellCardClick = () => {
    if (isBigScreen) {
      setOpen(!isOpen)
    } else {
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
    }
  }

  return (
    <motion.div
      className={styles.container}
      whileHover={{ y: isOpen ? 0 : '-1px' }}
      whileTap={{ y: '1px' }}
    >
      <button
        type="button"
        onClick={handleSpellCardClick}
        className={styles.button}
      >
        <div className="leading-tight text-left">
          <div className={styles.spellName}>{name}</div>
          <div className={styles.spellSchool}>{school}</div>
        </div>
        <div className={styles.spellLevel}>
          {level === 0 ? <span>Cantrip</span> : `Level ${level}`}
        </div>
      </button>

      {isOpen && (
        <div className={styles.bottomPartContainer}>
          <SpellConcentrationRitual
            concentration={concentration}
            ritual={ritual}
          />
          <SpellInfo
            attackSave={attackSave}
            castingTime={castingTime}
            components={components}
            damageEffect={damageEffect}
            duration={duration}
            range={range}
          />
          <SpellDescription description={description} />
          <SpellMaterial material={material} />
          <SpellKlasses klasses={klasses} />
        </div>
      )}
    </motion.div>
  )
}

export { SpellCard as default }
