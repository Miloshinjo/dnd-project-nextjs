import { CharacterUI } from '../../../../../models/character'
import SpellSlots from '../spell-slots'
import SpellsKnown from '../spells-known'

import styles from './styles.module.css'

type Props = {
  character: CharacterUI
}

const SorcererType: React.FC<Props> = ({ character }) => {
  const spellSlots = character.spellSlots
    ? JSON.parse(character.spellSlots)
    : []

  return (
    <div className={styles.container}>
      <SpellSlots spellSlots={spellSlots} characterId={character.id} />
      <SpellsKnown
        spells={character.spells}
        characterId={character.id}
        title="Spells Known"
      />
    </div>
  )
}

export { SorcererType as default }
