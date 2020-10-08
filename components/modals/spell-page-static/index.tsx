import { Spell, useSpellQuery } from '../../../generated/graphql'
import { motion } from 'framer-motion'

import SpellDescription from '../../spell/description'
import SpellInfo from '../../spell/info'
import SpellConcentrationRitual from '../../spell/concentration-ritual'
import SpellMaterial from '../../spell/material'
import SpellPageSkeleton from '../../skeletons/spell-page'
import SpellKlasses from '../../spell/klasses'

import styles from './styles.module.css'

type Props = {
  attackSave: Spell['attackSave']
  castingTime: Spell['castingTime']
  components: Spell['components']
  concentration: Spell['concentration']
  damageEffect: Spell['damageEffect']
  description: Spell['description']
  duration: Spell['duration']
  id: Spell['id']
  klasses: Spell['klasses']
  material: Spell['material']
  name: Spell['name']
  range: Spell['range']
  ritual: Spell['ritual']
  school: Spell['school']
}

const SpellPageModal: React.FC<Props> = ({
  attackSave,
  castingTime,
  components,
  concentration,
  damageEffect,
  description,
  duration,
  id,
  klasses,
  material,
  name,
  range,
  ritual,
  school,
}) => {
  return (
    <div className={styles.container}>
      <div className="flex flex-col p-4 items-start">
        <h2 className={styles.spellName}>{name}</h2>
        <h3 className={styles.spellSchool}>{school}</h3>
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
    </div>
  )
}

export { SpellPageModal as default }
