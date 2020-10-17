import { useMemo } from 'react'
import {
  Spell,
  Character,
  useSpellQuery,
  useCharacterSpellQuery,
} from '../../../generated/graphql'

import DrawerHeader from '../../modal/drawer-header'
import TextLoader from '../../layout/text-loader'
import SpellDescription from '../../spell/description'
import SpellInfo from '../../spell/info'
import SpellConcentrationRitual from '../../spell/concentration-ritual'
import SpellMaterial from '../../spell/material'
import SpellKlasses from '../../spell/klasses'
import CharacterControls from '../../spell/character-controls'

import styles from './styles.module.css'

type Props = {
  spellId: Spell['id']
  characterId: Character['id']
  cannotLearn: boolean
}

const SpellPageModal: React.FC<Props> = ({
  spellId,
  characterId,
  cannotLearn,
}) => {
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
      <div className={styles.fetchingContainer}>
        <TextLoader text="Fetching spell" />
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
    <>
      <DrawerHeader backgroundColor="var(--bg-drawer-header-2)" />
      <div className="flex flex-col items-start p-4">
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
          spellName={spell.name}
          spellLevel={spell.level}
          characterName={character?.name}
          isKnownSpell={isKnownSpell}
          isPreparedSpell={isPreparedSpell}
          cannotLearn={cannotLearn}
        />
      </div>
    </>
  )
}

export { SpellPageModal as default }
