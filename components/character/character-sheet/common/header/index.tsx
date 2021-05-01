import { useCallback } from 'react'

import { useModal } from '../../../../../context/modal'
import {
  useLevelMutation,
  CharacterQuery,
} from '../../../../../generated/graphql'

import ArcaneWard from './arcane-ward'
import HitPoints from './hit-points'

import styles from './styles.module.css'

type Props = {
  character: CharacterQuery['character']
}

const CharacterHeader: React.FC<Props> = ({ character }) => {
  const { openModal } = useModal()

  const characterKlassName = useCallback((klass, subclass) => {
    if (subclass) {
      if (klass === 'Cleric') {
        return `${subclass} Cleric`
      }

      return `${subclass} ${klass}`
    }

    return klass
  }, [])

  return (
    <div className={styles.container}>
      <div className={styles.imgNameKlass}>
        <img
          src={`/images/classes/${character.klass.name.toLowerCase()}.png`}
          alt="class name"
          className={styles.klassLogo}
        />
        <div className="flex flex-col">
          <div className="flex flex-col items-start">
            <div className={styles.characterName}>{character.name}</div>
            <div className={styles.characterRaceKlass}>
              {character.race}{' '}
              {characterKlassName(
                character.klass.name,
                character?.subclass?.name,
              )}
            </div>
          </div>
        </div>
      </div>
      <div className={styles.bottomContainer}>
        <div className="font-bold">
          <button
            className={styles.characterLevel}
            type="button"
            onClick={() =>
              openModal({
                type: 'number',
                props: {
                  originalValue: character.level,
                  characterId: character.id,
                  title: 'Level',
                  type: 'level',
                  mutation: useLevelMutation,
                },
              })
            }
          >
            Level {character.level}
          </button>
        </div>
        <div className={styles.hpContainer}>
          <HitPoints
            characterId={character.id}
            hitPoints={character.hitPoints}
            maxHitPoints={character.maxHitPoints}
          />
          {character?.subclass?.name === 'Abjuration' && (
            <ArcaneWard
              characterId={character.id}
              arcaneWard={character.arcaneWard}
              arcaneWardMax={character.arcaneWardMax}
            />
          )}
        </div>
      </div>
    </div>
  )
}

export { CharacterHeader as default }
