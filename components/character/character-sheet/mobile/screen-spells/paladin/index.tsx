import { Character } from '../../../../../../generated/graphql'

import { abilityScoreM } from '../../../../../../utils/character'
import SeeAllSpellsForKlassButton from '../../../common/see-all-spells-for-class-button'
import SpellSlots from '../spell-slots'
import SpellsKnown from '../spells-known'

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

const Paladin: React.FC<Props> = ({ character }) => {
  const spellSlots = character.spellSlots
    ? JSON.parse(character.spellSlots)
    : []

  return (
    <div className={styles.container}>
      <SpellSlots spellSlots={spellSlots} characterId={character.id} />
      <SeeAllSpellsForKlassButton
        klassName="Paladin"
        characterId={character.id}
      />
      <SpellsKnown
        spells={character.preparedSpells}
        characterId={character.id}
        title="Prepared Spells"
        counter={character.level + abilityScoreM(character.charisma)}
        noSpellsMessage="No spells prepared. You can prepare some by going to Paladin spell list."
      />
      <SpellsKnown
        spells={character.spells.filter((spell) => spell.level !== 0)}
        characterId={character.id}
        title="Oath Spells"
        noSpellsMessage="No Oath spells known. You can add them from the spell list."
      />
    </div>
  )
}

export { Paladin as default }
