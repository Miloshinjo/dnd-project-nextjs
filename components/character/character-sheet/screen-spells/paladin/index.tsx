import { useState } from 'react'
import { CharacterUI } from '../../../../../models/character'
import { useSpellsQuery } from '../../../../../generated/graphql'
import SpellSlots from '../spell-slots'
import SpellsKnown from '../spells-known'
import SpellsPrepared from '../spells-prepared'
import { abilityScoreM } from '../../../../../utils/character'

import styles from './styles.module.css'

type Props = {
  character: CharacterUI
}

const Paladin: React.FC<Props> = ({ character }) => {
  const spellSlots = character.spellSlots
    ? JSON.parse(character.spellSlots)
    : []

  const [{ data: paladinSpells }] = useSpellsQuery({
    variables: { klassName: 'paladin' },
  })

  const [spellsPrepareMode, setSpellsPrepareMode] = useState<boolean>(false)

  return (
    <div className={styles.container}>
      <SpellSlots spellSlots={spellSlots} characterId={character.id} />
      <SpellsPrepared
        characterId={character.id}
        spells={character.preparedSpells}
        setSpellsPrepareMode={setSpellsPrepareMode}
        spellsPrepareMode={spellsPrepareMode}
        numberOfSpellsPrepared={
          character.level + abilityScoreM(character.charisma)
        }
      />
      <SpellsKnown
        spells={
          paladinSpells?.spells.filter((spell) => spell.level !== 0) || []
        }
        characterId={character.id}
        title="Paladin Spells"
        learnControls={false}
        spellsPreparedIds={character.preparedSpells.map((spell) => spell.id)}
        spellsPrepareMode={spellsPrepareMode}
      />
    </div>
  )
}

export { Paladin as default }
