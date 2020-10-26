import { useMemo } from 'react'
import Link from 'next/link'

import { useModal } from '../../../context/modal'
import CheckboxButton from '../../buttons/checkbox-button'
import {
  Klass,
  Character,
  SubClass,
  Spell,
  useLearnSpellMutation,
  useForgetSpellMutation,
  usePrepareSpellMutation,
  useUnprepareSpellMutation,
} from '../../../generated/graphql'
import icons from './icons'

import styles from './styles.module.css'

type Props = {
  klassName: Klass['name']
  characterId: Character['id']
  spellId: Spell['id']
  spellName: Spell['name']
  characterName: Character['name']
  subclassName: SubClass['name'] | null
  isKnownSpell: boolean
  isPreparedSpell: boolean
  isStaticPage?: boolean
  spellLevel: Spell['level']
  cannotLearn?: boolean
  spellFetching?: boolean
}

const CharacterControls: React.FC<Props> = ({
  klassName,
  characterId,
  characterName,
  subclassName,
  spellId,
  spellLevel,
  spellName,
  isKnownSpell,
  isPreparedSpell,
  isStaticPage = false,
  cannotLearn = false,
  spellFetching = false,
}) => {
  const { closeModal } = useModal()
  const [, learnSpell] = useLearnSpellMutation()
  const [, prepareSpell] = usePrepareSpellMutation()
  const [, unprepareSpell] = useUnprepareSpellMutation()
  const [, forgetSpell] = useForgetSpellMutation()

  const learnSpellText = useMemo(() => {
    if (spellLevel === 0) {
      return isKnownSpell ? 'Cantrip known' : 'Learn Cantrip'
    } else {
      switch (klassName) {
        case 'Cleric':
          return 'Domain Spell'
        case 'Druid':
          return 'Circle Spell'
        case 'Wizard':
          return isKnownSpell ? 'In spellbook' : 'Add to spellbook'
        default:
          return isKnownSpell ? 'Spell known' : 'Learn spell'
      }
    }
  }, [isKnownSpell])

  const canPrepare = useMemo(() => {
    switch (klassName) {
      case 'Cleric':
      case 'Druid':
      case 'Paladin':
        return true && spellLevel !== 0
      case 'Wizard':
        return true && isKnownSpell && spellLevel !== 0
      default:
        return false
    }
  }, [isPreparedSpell, isKnownSpell])

  return (
    <div className={styles.container}>
      <div className={styles.iconContainer}>{icons[klassName]}</div>

      <div className="flex flex-col">
        {isStaticPage ? (
          <Link href={`/app/${characterId}`}>
            <a className="font-semibold text-left">{characterName}</a>
          </Link>
        ) : (
          <button
            type="button"
            onClick={() => {
              closeModal()
            }}
            className="font-semibold text-left"
          >
            {characterName}
          </button>
        )}
        <span className="opacity-50 text-sm">
          {subclassName} {klassName}
        </span>
      </div>
      <h2 className="mt-3 font-semibold mb-1">{spellName}</h2>
      <div className="flex justify-between items-end">
        <div className="flex flex-col gap-x-4">
          {cannotLearn ? null : (
            <CheckboxButton
              disabled={spellFetching}
              isChecked={isKnownSpell}
              onClick={async () => {
                if (isKnownSpell) {
                  const result = await forgetSpell({
                    id: characterId,
                    spellId: spellId,
                  })

                  if (result.error) {
                    console.log('An error occured')
                    return
                  }
                } else {
                  const result = await learnSpell({
                    id: characterId,
                    spellId: spellId,
                  })

                  if (result.error) {
                    console.log('An error occured')
                    return
                  }
                }
              }}
              text={learnSpellText}
            />
          )}
          {canPrepare ? (
            <CheckboxButton
              disabled={spellFetching}
              isChecked={isPreparedSpell}
              onClick={async () => {
                if (isPreparedSpell) {
                  const result = await unprepareSpell({
                    id: characterId,
                    spellId: spellId,
                  })

                  if (result.error) {
                    console.log('An error occured')
                    return
                  }
                } else {
                  const result = await prepareSpell({
                    id: characterId,
                    spellId: spellId,
                  })

                  if (result.error) {
                    console.log('An error occured')
                    return
                  }
                }
              }}
              text={isPreparedSpell ? 'Prepared' : 'Prepare'}
            />
          ) : null}
        </div>
        <div>
          <button onClick={() => closeModal()}>Back</button>
        </div>
      </div>
    </div>
  )
}

export { CharacterControls as default }
