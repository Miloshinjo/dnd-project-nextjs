import { useMemo } from 'react'
import Link from 'next/link'

import { useModal } from '../../../context/modal'
import SpinnerButton from '../../buttons/spinner-button'
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
  characterName: Character['name']
  subclassName: SubClass['name'] | null
  isKnownSpell: boolean
  isPreparedSpell: boolean
  isStaticPage?: boolean
  spellLevel: Spell['level']
  cannotLearn?: boolean
}

const CharacterControls: React.FC<Props> = ({
  klassName,
  characterId,
  characterName,
  subclassName,
  spellId,
  spellLevel,
  isKnownSpell,
  isPreparedSpell,
  isStaticPage = false,
  cannotLearn = false,
}) => {
  const { closeModal } = useModal()
  const [learnSpellResult, learnSpell] = useLearnSpellMutation()
  const [prepareSpellResult, prepareSpell] = usePrepareSpellMutation()
  const [unprepareSpellResult, unprepareSpell] = useUnprepareSpellMutation()
  const [forgetSpellResult, forgetSpell] = useForgetSpellMutation()

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

      <div className="flex flex-col mb-6">
        <span className="font-semibold">{characterName}</span>
        <span className="opacity-50 text-sm">
          {subclassName} {klassName}
        </span>
      </div>
      <div className="flex justify-between">
        <div className="">
          {canPrepare ? (
            isPreparedSpell ? (
              <SpinnerButton
                onClick={async () => {
                  const result = await unprepareSpell({
                    id: characterId,
                    spellId: spellId,
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
                    id: characterId,
                    spellId: spellId,
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
          {cannotLearn ? null : isKnownSpell ? (
            <SpinnerButton
              onClick={async () => {
                const result = await forgetSpell({
                  id: characterId,
                  spellId: spellId,
                })

                if (result.error) {
                  console.log('An error occured')
                  return
                }
              }}
              fetching={forgetSpellResult.fetching}
              text="Unlearn"
              textFetching="Unlearning"
            />
          ) : (
            <SpinnerButton
              onClick={async () => {
                const result = await learnSpell({
                  id: characterId,
                  spellId: spellId,
                })

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
        <div className="flex items-end flex-col text-sm">
          {isStaticPage ? (
            <div className="flex flex-col items-end">
              <Link href={`/app/${characterId}`}>
                <a>Back to character</a>
              </Link>
              <button
                type="button"
                onClick={() => {
                  closeModal()
                }}
              >
                Back
              </button>
            </div>
          ) : (
            <button
              type="button"
              onClick={() => {
                closeModal()
              }}
            >
              Back to character
            </button>
          )}
        </div>
      </div>
    </div>
  )
}

export { CharacterControls as default }
