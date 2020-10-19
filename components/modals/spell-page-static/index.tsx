import {
  Spell,
  useCharacterSpellQuery,
  useSpellQuery,
} from '../../../generated/graphql'
import { useRouter } from 'next/router'
import { useMemo } from 'react'

import DrawerHeader from '../../modal/drawer-header'
import TextLoader from '../../layout/text-loader'
import CharacterControls from '../../spell/character-controls'
import SpellDescription from '../../spell/description'
import SpellInfo from '../../spell/info'
import SpellName from '../../spell/name'
import SpellConcentrationRitual from '../../spell/concentration-ritual'
import SpellMaterial from '../../spell/material'
import SpellKlasses from '../../spell/klasses'

import styles from './styles.module.css'

type Props = {
  attackSave: Spell['attackSave']
  castingTime: Spell['castingTime']
  components: Spell['components']
  concentration: Spell['concentration']
  damageEffect: Spell['damageEffect']
  description: Spell['description']
  duration: Spell['duration']
  id: Spell['id']
  level: Spell['level']
  klasses: Spell['klasses']
  material: Spell['material']
  name: Spell['name']
  range: Spell['range']
  ritual: Spell['ritual']
  school: Spell['school']
}

const SpellPageModal: React.FC<Props> = ({
  attackSave,
  castingTime,
  components,
  concentration,
  damageEffect,
  description,
  duration,
  id,
  klasses,
  level,
  material,
  name,
  range,
  ritual,
  school,
}) => {
  const { query } = useRouter()

  const [
    { data: characterData, fetching: fetchingCharacterData, error },
  ] = useCharacterSpellQuery({
    variables: { id: Number(query.character) },
    pause: !query.character,
  })

  const [
    { data: spellData, fetching: spellFetching, error: spellError },
  ] = useSpellQuery({
    variables: { id },
    pause: !query.character,
  })

  const isKnownSpell = useMemo(() => {
    if (characterData) {
      const knownSpellIds = characterData.character.spells.map(
        (spell) => spell.id,
      )

      if (knownSpellIds.includes(id)) {
        return true
      }
    }

    return false
  }, [characterData])

  const isPreparedSpell = useMemo(() => {
    if (characterData) {
      const preparedSpellsIds = characterData.character.preparedSpells.map(
        (spell) => spell.id,
      )

      if (preparedSpellsIds.includes(id)) {
        return true
      }
    }

    return false
  }, [characterData])

  if (fetchingCharacterData) {
    return (
      <div className={styles.fetchingContainer}>
        <TextLoader text="Fetching spell" />
      </div>
    )
  }

  const character = characterData?.character

  return (
    <>
      <DrawerHeader backgroundColor="var(--bg-drawer-header-2)" />
      <div className={styles.container}>
        <SpellName level={level} name={name} school={school} />
        <SpellConcentrationRitual
          concentration={concentration}
          ritual={ritual}
        />
        <SpellInfo
          attackSave={attackSave}
          castingTime={castingTime}
          components={components}
          damageEffect={damageEffect}
          duration={duration}
          range={range}
        />
        <SpellDescription description={description} />
        <SpellMaterial material={material} />
        <SpellKlasses klasses={klasses} />

        {character && (
          <CharacterControls
            klassName={character?.klass?.name}
            subclassName={character?.subclass?.name}
            characterId={character?.id}
            spellId={id}
            characterName={character?.name}
            isKnownSpell={isKnownSpell}
            spellLevel={level}
            spellName={name}
            isPreparedSpell={isPreparedSpell}
            isStaticPage
            spellFetching={spellFetching}
          />
        )}
      </div>
    </>
  )
}

export { SpellPageModal as default }
