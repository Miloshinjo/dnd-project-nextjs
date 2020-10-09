import {
  Spell,
  useCharacterSpellQuery,
  useLearnSpellMutation,
  useForgetSpellMutation,
  usePrepareSpellMutation,
  useUnprepareSpellMutation,
} from '../../../generated/graphql'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useMemo } from 'react'

import CharacterControls from '../../spell/character-controls'
import SpellDescription from '../../spell/description'
import SpellInfo from '../../spell/info'
import SpellConcentrationRitual from '../../spell/concentration-ritual'
import SpellMaterial from '../../spell/material'
import SpellKlasses from '../../spell/klasses'
import SpinnerButton from '../../buttons/spinner-button'
import icons from './icons'

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
    return <div>Loading..</div>
  }

  const { character } = characterData

  return (
    <div className={styles.container}>
      <div className="flex flex-col p-4 items-start">
        <h2 className={styles.spellName}>{name}</h2>
        <h3 className={styles.spellSchool}>{school}</h3>
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
        {characterData && (
          <CharacterControls
            klassName={character?.klass?.name}
            subclassName={character?.subclass?.name}
            characterId={character?.id}
            spellId={id}
            characterName={character?.name}
            isKnownSpell={isKnownSpell}
            isPreparedSpell={isPreparedSpell}
            closeAction="linkToCharacter"
          />
        )}
      </div>
    </div>
  )
}

export { SpellPageModal as default }
