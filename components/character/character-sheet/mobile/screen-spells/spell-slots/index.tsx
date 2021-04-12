import { useState, useEffect } from 'react'

import { FaPlus, FaMinus } from 'react-icons/fa'
import { RiQuillPenLine } from 'react-icons/ri'

import {
  useSpellSlotsMutation,
  Character,
} from '../../../../../../generated/graphql'
import useDebounce from '../../../../../../hooks/useDebounce'
import AddOrRemove from '../../../common/add-or-remove'

import SlotButton from './slot-button'

import styles from './styles.module.css'

type Props = {
  characterId: Character['id']
  spellSlots: Array<Array<boolean>>
}

const SpellSlots: React.FC<Props> = ({ characterId, spellSlots }) => {
  const [slots, setSlots] = useState(spellSlots)
  const [editSlots, setEditSlots] = useState<boolean>(false)

  const debouncedSlots = useDebounce(slots, 400)

  const [, setSpellSlots] = useSpellSlotsMutation()

  useEffect(() => {
    const slotsString = JSON.stringify(slots)

    const awaitSpellSlots = async () => {
      const result = await setSpellSlots({
        id: characterId,
        spellSlots: slotsString,
      })

      if (result.error) {
        console.log('An error occured. Handle it later.')
        return
      }
    }

    awaitSpellSlots()
  }, [debouncedSlots])

  const toggleSlot = (
    targetSlotLevelIndex: number,
    targetSlotIndex: number,
  ): void => {
    const newSlots = slots.map((levelSlot, slotLevelsIndex) => {
      if (slotLevelsIndex !== targetSlotLevelIndex) return levelSlot

      return levelSlot.map((slot, index) => {
        if (index !== targetSlotIndex) return slot
        return !slot
      })
    })

    setSlots(newSlots)
  }

  const addLevel = (): void => {
    setSlots([...slots, [false]])
  }

  const removeLevel = (): void => {
    const newSlots = slots.filter((_, index, arr) => {
      return index !== arr.length - 1
    })

    setSlots(newSlots)
  }

  const addSlot = (targetSlotLevelIndex: number): void => {
    const newSlots = slots.map((levelSlot, slotLevelsIndex) => {
      if (slotLevelsIndex !== targetSlotLevelIndex) return levelSlot

      return [...levelSlot, false]
    })

    setSlots(newSlots)
  }

  const removeSlot = (targetSlotLevelIndex: number): void => {
    const newSlots = slots.map((levelSlot, slotLevelsIndex) => {
      if (slotLevelsIndex !== targetSlotLevelIndex) return levelSlot

      const newlevelSlot = levelSlot.filter((_, index, arr) => {
        return index !== arr.length - 1
      })

      return newlevelSlot
    })

    setSlots(newSlots)
  }

  return (
    <div className={styles.container}>
      <div className="p-2">
        <div className="flex items-center pl-2 justify-between mb-4">
          <h3 className="statSectionHeading">Spell Slots</h3>
          <button
            className={
              editSlots ? styles.slotsEditButtonActive : styles.slotsEditButton
            }
            onClick={() => setEditSlots(!editSlots)}
          >
            <RiQuillPenLine size={18} />
          </button>
        </div>
        <div className="px-2">
          {slots.length ? (
            slots.map((levelSlot, slotLevelsIndex) => {
              return (
                <div key={Math.random()} className={styles.slotLevelContainer}>
                  {editSlots && (
                    <button
                      className={styles.removeSlotButton}
                      onClick={() => removeSlot(slotLevelsIndex)}
                    >
                      <FaMinus />
                    </button>
                  )}

                  <div
                    className={`${styles.slotLevelText} ${
                      editSlots ? 'opacity-25' : null
                    }`}
                  >
                    {slotLevelsIndex + 1}
                  </div>
                  <div
                    className={`grid grid-cols-6 ml-2 gap-1 ${
                      editSlots ? 'opacity-25' : null
                    }`}
                  >
                    {levelSlot.map((slot, index) => {
                      return (
                        <SlotButton
                          key={index}
                          isChecked={slot}
                          onClick={() => toggleSlot(slotLevelsIndex, index)}
                          editSlots={editSlots}
                        />
                      )
                    })}
                  </div>
                  {editSlots && (
                    <button
                      className={styles.addSlotButton}
                      onClick={() => addSlot(slotLevelsIndex)}
                    >
                      <FaPlus />
                    </button>
                  )}
                </div>
              )
            })
          ) : (
            <div className={styles.noSlotsText}>No slots assigned.</div>
          )}
        </div>
        {editSlots && (
          <AddOrRemove
            plusClick={addLevel}
            minusClick={removeLevel}
            message="Add or remove spell slot levels"
          />
        )}
      </div>
    </div>
  )
}

export { SpellSlots as default }
