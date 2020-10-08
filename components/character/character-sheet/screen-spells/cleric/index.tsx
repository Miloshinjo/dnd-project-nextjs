import { useState } from 'react'

import {
  useSpellsKlassQuery,
  Character,
} from '../../../../../generated/graphql'
import SpellSlots from '../spell-slots'
import SpellsKnown from '../spells-known'
import SpellsPrepared from '../spells-prepared'
import { abilityScoreM } from '../../../../../utils/character'

import styles from './styles.module.css'

type Props = {
  character: Pick<
    Character,
    | 'id'
    | 'name'
    | 'armorClass'
    | 'level'
    | 'race'
    | 'klass'
    | 'hitPoints'
    | 'maxHitPoints'
    | 'arcaneWard'
    | 'arcaneWardMax'
    | 'alignment'
    | 'gold'
    | 'inspiration'
    | 'strength'
    | 'dexterity'
    | 'intelligence'
    | 'wisdom'
    | 'charisma'
    | 'constitution'
    | 'skills'
    | 'speed'
    | 'spellSlots'
    | 'subclass'
    | 'spells'
    | 'preparedSpells'
  >
}

const Cleric: React.FC<Props> = ({ character }) => {
  const spellSlots = character.spellSlots
    ? JSON.parse(character.spellSlots)
    : []

  const [{ data: clericSpells }] = useSpellsKlassQuery({
    variables: { klassName: 'cleric' },
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
          character.level + abilityScoreM(character.wisdom)
        }
      />
      <SpellsKnown
        spells={character.spells}
        characterId={character.id}
        title="Cantrips and Domain Spells"
      />
      <SpellsKnown
        spells={clericSpells?.spells.filter((spell) => spell.level !== 0) || []}
        characterId={character.id}
        title="Cleric Spells"
        learnControls={false}
        spellsPreparedIds={character.preparedSpells.map((spell) => spell.id)}
        spellsPrepareMode={spellsPrepareMode}
      />
    </div>
  )
}

export { Cleric as default }
