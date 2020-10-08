import { useState, useEffect } from 'react'

import { IoMdClose } from 'react-icons/io'
import { FaPlus, FaMinus } from 'react-icons/fa'
import useDebounce from '../../../../../hooks/useDebounce'
import {
  useSpellSlotsMutation,
  Character,
} from '../../../../../generated/graphql'

import styles from './styles.module.css'

type Props = {
  characterId: Character['id']
  spellSlots: Array<Array<boolean>>
}

const SpellSlots: React.FC<Props> = ({ characterId, spellSlots }) => {
  const [slots, setSlots] = useState(spellSlots)
  const [editSlots, setEditSlots] = useState<boolean>(false)

  const debouncedSlots = useDebounce(slots, 500)

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
    targeSlotIndex: number,
  ): void => {
    const newSlots = slots.map((levelSlot, slotLevelsIndex) => {
      if (slotLevelsIndex !== targetSlotLevelIndex) return levelSlot

      return levelSlot.map((slot, index) => {
        if (index !== targeSlotIndex) return slot
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
        <div className="flex items-center px-4 justify-between mb-6">
          <h4 className="text-center text-sm font-medium text-gray-600">
            Spell Slots
          </h4>
          <button
            className={
              editSlots ? styles.slotsEditButtonActive : styles.slotsEditButton
            }
            onClick={() => setEditSlots(!editSlots)}
          >
            Edit Slots
          </button>
        </div>
        <div className="px-4">
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

                  <div className={styles.slotLevelText}>
                    {slotLevelsIndex + 1}
                  </div>
                  <div className="flex flex-wrap mx-2">
                    {levelSlot.map((slot, index) => {
                      return (
                        <button
                          key={Math.random()}
                          className={styles.spellSlotButton}
                          onClick={() => toggleSlot(slotLevelsIndex, index)}
                        >
                          {slot ? (
                            <IoMdClose size={23} color="#1a202c" />
                          ) : null}
                        </button>
                      )
                    })}
                  </div>
                  {editSlots && (
                    <button
                      className="ml-auto text-gray-400"
                      onClick={() => addSlot(slotLevelsIndex)}
                    >
                      <FaPlus />
                    </button>
                  )}
                </div>
              )
            })
          ) : (
            <div className="text-gray-600">----</div>
          )}
        </div>
        {editSlots && (
          <div className="mt-10 flex flex-col items-center">
            Add/Remove spell levels
            <div className="flex mt-4">
              <button className="mr-4 text-gray-400" onClick={removeLevel}>
                <FaMinus size={35} />
              </button>
              <button className="text-gray-400" onClick={addLevel}>
                <FaPlus size={35} />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export { SpellSlots as default }
