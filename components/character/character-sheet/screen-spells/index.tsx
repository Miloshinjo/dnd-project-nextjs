import { useCallback } from 'react'
import { motion } from 'framer-motion'

import { CharacterUI } from '../../../../models/character'
import {
  spellHit,
  spellSaveDc,
  abilityScoreM,
  proficiencyBonus,
} from '../../../../utils/character'
import StatField from '../common/stat-field'
import Cleric from './cleric'
import Wizard from './wizard'
import Druid from './druid'
import Paladin from './paladin'
import SorcererType from './sorcerer-type'

import styles from './styles.module.css'

const screenVariants = {
  initial: { x: '100vw' },
  animate: {
    x: '0',
    transition: { duration: 0.3, ease: 'easeIn' },
  },
}

type Props = {
  character: CharacterUI
}

const ScreenSpells: React.FC<Props> = ({ character }) => {
  const renderSpellType = useCallback(
    (
      klass: CharacterUI['klass'],
      subclass: CharacterUI['subclass'],
      character,
    ) => {
      if (
        subclass?.name === 'Arcane Trickster' ||
        subclass?.name === 'Eldritch Knight'
      ) {
        return <SorcererType character={character} />
      }

      switch (klass.name) {
        case 'Sorcerer':
        case 'Bard':
        case 'Ranger':
        case 'Warlock':
          return <SorcererType character={character} />
        case 'Cleric':
          return <Cleric character={character} />
        case 'Druid':
          return <Druid character={character} />
        case 'Paladin':
          return <Paladin character={character} />
        case 'Wizard':
          return <Wizard character={character} />

        default:
          return null
      }
    },
    [character.klass.name, character.subclass?.name],
  )

  return (
    <motion.div
      variants={screenVariants}
      animate="animate"
      initial="initial"
      className={styles.container}
    >
      <div className={styles.header}>
        <StatField
          label="Ability"
          value={(
            character.subclass?.spellCastingModifier ||
            character.klass.spellCastingModifier
          ).substring(0, 3)}
        />
        <StatField
          label="Spell attack"
          value={spellHit(
            abilityScoreM(
              character.subclass?.spellCastingModifier
                ? character[character.subclass?.spellCastingModifier]
                : character[character.klass.spellCastingModifier],
            ),
            proficiencyBonus(character.level),
          )}
        />
        <StatField
          label="Save DC"
          value={spellSaveDc(
            abilityScoreM(
              character.subclass?.spellCastingModifier
                ? character[character.subclass?.spellCastingModifier]
                : character[character.klass.spellCastingModifier],
            ),
            proficiencyBonus(character.level),
          )}
        />
      </div>
      {renderSpellType(character.klass, character.subclass, character)}
    </motion.div>
  )
}

export { ScreenSpells as default }
