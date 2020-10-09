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

  const [learnSpellResult, learnSpell] = useLearnSpellMutation()
  const [prepareSpellResult, prepareSpell] = usePrepareSpellMutation()
  const [unprepareSpellResult, unprepareSpell] = useUnprepareSpellMutation()
  const [forgetSpellResult, forgetSpell] = useForgetSpellMutation()

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

  const canPrepare = useMemo(() => {
    switch (characterData?.character?.klass?.name) {
      case 'Cleric':
      case 'Druid':
      case 'Paladin':
      case 'Wizard':
        return true && isKnownSpell
      default:
        return false
    }
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
        <div className="p-4 rounded bg-white shadow-lg w-full relative mt-4">
          {characterData?.character?.klass?.name && (
            <div className={styles.iconContainer}>
              {icons[characterData?.character?.klass?.name]}
            </div>
          )}

          <div className="flex flex-col mb-6">
            <span className="font-semibold">
              {characterData?.character?.name}
            </span>
            <span className="opacity-50 text-sm">
              {characterData?.character?.subclass?.name}{' '}
              {characterData?.character?.klass?.name}
            </span>
          </div>
          <div className="flex justify-between">
            <div className="">
              {canPrepare ? (
                isPreparedSpell ? (
                  <SpinnerButton
                    onClick={async () => {
                      const result = await unprepareSpell({
                        id: characterData?.character?.id,
                        spellId: id,
                      })

                      if (result.error) {
                        console.log('An error occured')
                        return
                      }
                    }}
                    fetching={unprepareSpellResult.fetching}
                    text="Unprepare"
                    textFetching="Unpreparing"
                  />
                ) : (
                  <SpinnerButton
                    onClick={async () => {
                      const result = await prepareSpell({
                        id: characterData?.character?.id,
                        spellId: id,
                      })

                      if (result.error) {
                        console.log('An error occured')
                        return
                      }
                    }}
                    fetching={prepareSpellResult.fetching}
                    text="Prepare"
                    textFetching="Preparing"
                  />
                )
              ) : null}
              {isKnownSpell ? (
                <SpinnerButton
                  onClick={async () => {
                    const result = await forgetSpell({
                      id: characterData?.character?.id,
                      spellId: id,
                    })

                    if (result.error) {
                      console.log('An error occured')
                      return
                    }
                  }}
                  fetching={forgetSpellResult.fetching}
                  text="Remove"
                  textFetching="Removing"
                />
              ) : (
                <SpinnerButton
                  onClick={async () => {
                    const result = await learnSpell({
                      id: characterData?.character?.id,
                      spellId: id,
                    })

                    console.log({ result })

                    if (result.error) {
                      console.log('An error occured')
                      return
                    }
                  }}
                  fetching={learnSpellResult.fetching}
                  text="Learn"
                  textFetching="Learning"
                />
              )}
            </div>
            <div className="flex items-end">
              <Link href={`/app/${characterData.character.id}`}>
                <a>Back to character</a>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export { SpellPageModal as default }
