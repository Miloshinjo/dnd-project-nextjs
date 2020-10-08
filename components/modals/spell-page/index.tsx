import { Spell, useSpellQuery } from '../../../generated/graphql'
import { motion } from 'framer-motion'

import Loader from '../../layout/loader'
import SpellDescription from '../../spell/description'
import SpellInfo from '../../spell/info'
import SpellConcentrationRitual from '../../spell/concentration-ritual'
import SpellMaterial from '../../spell/material'
import SpellPageSkeleton from '../../skeletons/spell-page'
import SpellKlasses from '../../spell/klasses'

import styles from './styles.module.css'

const barVariants = {
  animation: {
    x: [-25, 175],
    transition: {
      duration: 1,
      repeat: Infinity,
      ease: [0.2, 0.7, 0.3, 1],
    },
  },
}

type Props = {
  spellId: Spell['id']
  spellName: Spell['name']
}

const SpellPageModal: React.FC<Props> = ({ spellId }) => {
  const [result] = useSpellQuery({
    variables: { id: spellId },
  })

  if (result.fetching) {
    return (
      <div className={styles.skeletonContainer}>
        <div className={styles.skeletonNameBar}>
          <motion.div
            className={styles.animatedBar}
            variants={barVariants}
            animate="animation"
          />
        </div>

        <div className={styles.skeletonSchoolBar}>
          <motion.div
            className={styles.animatedBar}
            variants={barVariants}
            animate="animation"
          />
        </div>

        <div className={styles.skeletonInfo}>
          <div className={styles.skeletonInfoField}></div>
          <div className={styles.skeletonInfoField}></div>
          <div className={styles.skeletonInfoField}></div>
          <div className={styles.skeletonInfoField}></div>
          <div className={styles.skeletonInfoField}></div>
          <div className={styles.skeletonInfoField}></div>
        </div>

        <div className={styles.skeletonDescription}></div>

        <div className={styles.skeletonKlasses}>
          <motion.div
            className={styles.animatedBar}
            variants={barVariants}
            animate="animation"
          />
        </div>
      </div>
    )
  }

  if (result.error) {
    console.log(result.error)
    return <div>{result?.error?.message || 'Unknown error occurred'}</div>
  }

  const { spell } = result.data

  return (
    <div className={styles.container}>
      <div className="flex flex-col p-4 items-start">
        <h2 className={styles.spellName}>{spell.name}</h2>
        <h3 className={styles.spellSchool}>{spell.school}</h3>
        <SpellConcentrationRitual
          concentration={spell.concentration}
          ritual={spell.ritual}
        />
        <SpellInfo
          attackSave={spell.attackSave}
          castingTime={spell.castingTime}
          components={spell.components}
          damageEffect={spell.damageEffect}
          duration={spell.duration}
          range={spell.range}
        />
        <SpellDescription description={spell.description} />
        <SpellMaterial material={spell.material} />
        <SpellKlasses klasses={spell.klasses} />
      </div>
    </div>
  )
}

export { SpellPageModal as default }
