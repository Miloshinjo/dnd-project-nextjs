import { useRouter } from 'next/router'

import { Character } from '../../../../../generated/graphql'

import SpellSlots from '../spell-slots'
import SpellsKnown from '../spells-known'
import SpellsPrepared from '../spells-prepared'
import { abilityScoreM } from '../../../../../utils/character'
import { seeAllSpellsForKlass } from '../../../../../utils/spells'

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
  const router = useRouter()

  const spellSlots = character.spellSlots
    ? JSON.parse(character.spellSlots)
    : []

  return (
    <div className={styles.container}>
      <SpellSlots spellSlots={spellSlots} characterId={character.id} />
      <SpellsPrepared
        characterId={character.id}
        spells={character.preparedSpells}
        numberOfSpellsPrepared={
          character.level + abilityScoreM(character.charisma)
        }
        klassName="Paladins"
      />
      <button
        className="inline-flex ml-2"
        onClick={() => {
          seeAllSpellsForKlass({
            klassName: 'paladin',
            characterId: character.id,
            router,
          })
        }}
      >
        <span className="ml-2 mt-4 underline pb-4">All Paladin spells</span>
      </button>
    </div>
  )
}

export { Paladin as default }
