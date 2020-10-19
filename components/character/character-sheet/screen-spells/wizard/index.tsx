import { Character } from '../../../../../generated/graphql'
import SpellSlots from '../spell-slots'
import SpellsKnown from '../spells-known'
import { abilityScoreM } from '../../../../../utils/character'
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
const Wizard: React.FC<Props> = ({ character }) => {
  const spellSlots = character.spellSlots
    ? JSON.parse(character.spellSlots)
    : []

  return (
    <div className={styles.container}>
      <SpellSlots spellSlots={spellSlots} characterId={character.id} />
      <SeeAllSpellsForKlassButton
        klassName="Wizard"
        characterId={character.id}
      />
      <SpellsKnown
        spells={character.preparedSpells}
        characterId={character.id}
        title="Prepared Spells"
        counter={character.level + abilityScoreM(character.intelligence)}
        noSpellsMessage="No spells prepared. You can prepare them from your Spellbook."
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
        title="Spellbook"
        noSpellsMessage="Spellbook empty. You can add spells to it from the Wizard spell list."
      />
    </div>
  )
}

export { Wizard as default }
