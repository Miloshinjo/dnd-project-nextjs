import { useMemo } from 'react'
import { Character } from '../../../../../generated/graphql'
import SpellSlots from '../spell-slots'
import SpellsKnown from '../spells-known'

import SeeAllSpellsForKlassButton from '../../common/see-all-spells-for-class-button'

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

const SorcererType: React.FC<Props> = ({ character }) => {
  const spellSlots = character.spellSlots
    ? JSON.parse(character.spellSlots)
    : []

  const showKlassName = useMemo(() => {
    if (character.subclass?.name === 'Arcane Trickster') {
      return 'Arcane Trickster'
    } else if (character.subclass?.name === 'Eldritch Knight') {
      return 'Eldritch Knight'
    } else {
      return character.klass.name
    }
  }, [character.subclass?.name, character.klass.name])

  return (
    <div className={styles.container}>
      <SpellSlots spellSlots={spellSlots} characterId={character.id} />
      <SeeAllSpellsForKlassButton
        klassName={showKlassName}
        characterId={character.id}
      />
      <SpellsKnown
        spells={character.spells.filter((spell) => spell.level === 0)}
        characterId={character.id}
        title="Cantrips"
        showSectionTitle={false}
        noSpellsMessage="No cantrips known. You can add them from the spell list."
      />
      <SpellsKnown
        spells={character.spells.filter((spell) => spell.level !== 0)}
        characterId={character.id}
        title="Known Spells"
        noSpellsMessage="No spells known. You can add them from the spell list."
      />
    </div>
  )
}

export { SorcererType as default }
