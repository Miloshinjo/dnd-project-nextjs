import { useMemo } from 'react'
import { motion } from 'framer-motion'
import {
  Spell,
  Klass,
  Character,
  useSpellQuery,
  useCharacterSpellQuery,
} from '../../../generated/graphql'

import Loader from '../../layout/loader'
import SpellDescription from '../../spell/description'
import SpellInfo from '../../spell/info'
import SpellConcentrationRitual from '../../spell/concentration-ritual'
import SpellMaterial from '../../spell/material'
import SpellPageSkeleton from '../../skeletons/spell-page'
import SpellKlasses from '../../spell/klasses'
import CharacterControls from '../../spell/character-controls'

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
  characterId: Character['id']
}

const SpellPageModal: React.FC<Props> = ({ spellId, characterId }) => {
  const [
    { data: spellData, fetching: spellFetching, error: spellError },
  ] = useSpellQuery({
    variables: { id: spellId },
  })

  const [
    { data: characterData, fetching: characterFetching, error: characterError },
  ] = useCharacterSpellQuery({
    variables: { id: characterId },
  })

  const isKnownSpell = useMemo(() => {
    if (characterData && spellData) {
      const knownSpellIds = characterData.character.spells.map(
        (spell) => spell.id,
      )

      if (knownSpellIds.includes(spellData.spell.id)) {
        return true
      }
    }

    return false
  }, [characterData, spellData])

  const isPreparedSpell = useMemo(() => {
    if (characterData && spellData) {
      const preparedSpellsIds = characterData.character.preparedSpells.map(
        (spell) => spell.id,
      )

      if (preparedSpellsIds.includes(spellData.spell.id)) {
        return true
      }
    }

    return false
  }, [characterData, spellData])

  if (spellFetching || characterFetching) {
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

  if (spellError) {
    console.log(spellError)
    return <div>{spellError?.message || 'Unknown error occurred'}</div>
  }

  if (characterError) {
    console.log(characterError)
    return <div>{characterError?.message || 'Unknown error occurred'}</div>
  }

  const { spell } = spellData
  const { character } = characterData

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

        <CharacterControls
          klassName={character?.klass?.name}
          subclassName={character?.subclass?.name}
          characterId={character?.id}
          spellId={spell.id}
          characterName={character?.name}
          isKnownSpell={isKnownSpell}
          isPreparedSpell={isPreparedSpell}
        />
      </div>
    </div>
  )
}

export { SpellPageModal as default }
