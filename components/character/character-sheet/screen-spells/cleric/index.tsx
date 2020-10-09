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

  return (
    <div className={styles.container}>
      <SpellSlots spellSlots={spellSlots} characterId={character.id} />
      <SpellsPrepared
        characterId={character.id}
        spells={character.preparedSpells}
        numberOfSpellsPrepared={
          character.level + abilityScoreM(character.wisdom)
        }
      />
      <SpellsKnown
        spells={character.spells.filter((spell) => spell.level === 0)}
        characterId={character.id}
        title="Cantrips"
        showSectionTitle={false}
      />
      <SpellsKnown
        spells={character.spells.filter((spell) => spell.level !== 0)}
        characterId={character.id}
        title="Domain Spells"
        showSectionTitle={false}
      />
      <SpellsKnown
        spells={clericSpells?.spells.filter((spell) => spell.level !== 0) || []}
        characterId={character.id}
        title="Cleric Spells"
        learnControls={false}
        cannotLearn={true}
      />
    </div>
  )
}

export { Cleric as default }
