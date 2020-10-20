import React from 'react'
import { RiQuillPenLine } from 'react-icons/ri'
import { useKlassAbilityOneMutation } from '../../../../../generated/graphql'
import useDebounce from '../../../../../hooks/useDebounce'

import AddOrRemove from '../../common/add-or-remove'

import styles from './styles.module.css'

type AbilityPoints = Array<boolean>

type Props = {
  message: string
  title: string
  klassName: string
  characterId: number
  klassAbilityOne: string
}

const KlassAbilityTracker: React.FC<Props> = ({
  message,
  title,
  klassName,
  characterId,
  klassAbilityOne,
}) => {
  const klassAbilityPointsDefault = klassAbilityOne
    ? JSON.parse(klassAbilityOne)
    : []

  const [editPoints, setEditPoints] = React.useState<boolean>(false)
  const [abilityPoints, setAbilityPoints] = React.useState<AbilityPoints>(
    klassAbilityPointsDefault,
  )

  const debouncedAbilityPoints = useDebounce(abilityPoints, 400)

  const [, setKlassAbilityPoints] = useKlassAbilityOneMutation()

  React.useEffect(() => {
    const klassAbilityOneString = JSON.stringify(abilityPoints)

    const awaitKlassAbilityPoints = async () => {
      const result = await setKlassAbilityPoints({
        id: characterId,
        klassAbilityOne: klassAbilityOneString,
      })

      if (result.error) {
        console.log('An error occured. Handle it later.')
        return
      }
    }

    awaitKlassAbilityPoints()
  }, [debouncedAbilityPoints])

  const addAbilityPoint = () => {
    setAbilityPoints([...abilityPoints, true])
  }

  const removeAbilityPoint = () => {
    const newAbilityPoints = abilityPoints.slice(0, -1)
    setAbilityPoints(newAbilityPoints)
  }

  const toggleAbilityPoints = (index: number) => {
    const newAbilityPoints = abilityPoints.map((point, i) => {
      if (i === index) {
        return !point
      } else {
        return point
      }
    })

    setAbilityPoints(newAbilityPoints)
  }

  return (
    <div className={styles.container}>
      <div className="flex items-center justify-between">
        <h2>{title}</h2>
        <button
          className={
            editPoints ? styles.slotsEditButtonActive : styles.slotsEditButton
          }
          onClick={() => setEditPoints(!editPoints)}
        >
          <RiQuillPenLine size={18} />
        </button>
      </div>

      {abilityPoints.length === 0 ? (
        <div className="italic text-sm mt-2">
          You have no {title} at the moment. You can add some anytime.
        </div>
      ) : (
        <div className={styles.abilityPoints}>
          {abilityPoints.map((point: boolean, index: number) => {
            return (
              <button
                key={index}
                className={styles.abilityPoint}
                type="button"
                onClick={() => {
                  toggleAbilityPoints(index)
                }}
              >
                {point ? (
                  <div
                    className={styles.abilityPointInner}
                    style={{ backgroundColor: `var(--color-${klassName})` }}
                  />
                ) : null}
              </button>
            )
          })}
        </div>
      )}
      {editPoints && (
        <AddOrRemove
          plusClick={addAbilityPoint}
          minusClick={removeAbilityPoint}
          message={message}
        />
      )}
    </div>
  )
}

export { KlassAbilityTracker as default }
