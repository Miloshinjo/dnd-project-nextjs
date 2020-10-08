import { Dispatch, SetStateAction } from 'react'
import { IoMdClose } from 'react-icons/io'

import { Character } from '../../../../../generated/graphql'

import {
  useUnprepareSpellMutation,
  Spell,
} from '../../../../../generated/graphql'
import { useModal } from '../../../../../context/modal'

import styles from './styles.module.css'

type Props = {
  characterId: Character['id']
  spells: Character['spells']
  spellsPrepareMode: boolean
  setSpellsPrepareMode: Dispatch<SetStateAction<boolean>>
  numberOfSpellsPrepared: number
}

const SpellsPrepared: React.FC<Props> = ({
  characterId,
  spells,
  spellsPrepareMode,
  setSpellsPrepareMode,
  numberOfSpellsPrepared,
}) => {
  const { openModal } = useModal()

  const [, unprepareSpell] = useUnprepareSpellMutation()

  const handleUnprepareSpell = async (spellId: Spell['id']): Promise<void> => {
    const result = await unprepareSpell({ id: characterId, spellId })

    if (result.error) {
      console.log(result.error)
    }
  }

  return (
    <div className={styles.container}>
      <div className="p-2">
        <div className="flex items-center px-4 justify-between mb-4">
          <h4 className="text-center text-sm font-medium text-gray-600">
            Spells prepared
            <span className="text-xs ml-1 text-gray-500">
              ({spells.length} of {numberOfSpellsPrepared})
            </span>
          </h4>
          <button
            className={styles.prepareSpellsButton}
            onClick={() => setSpellsPrepareMode(!spellsPrepareMode)}
          >
            Prepare Spells
          </button>
        </div>
        <div className="px-4 flex flex-wrap">
          {spells.length ? (
            spells.map((spell) => {
              return (
                <div className="flex items-center mr-2 mb-2" key={spell.id}>
                  <button
                    type="button"
                    className="px-2 text-sm bg-white shadow-inner border"
                    onClick={() =>
                      openModal({
                        type: 'spell',
                        props: {
                          spellId: spell.id,
                          spellName: spell.name,
                        },
                      })
                    }
                  >
                    {spell.name}
                  </button>
                  {spellsPrepareMode && (
                    <button
                      type="button"
                      className="ml-1"
                      onClick={() => handleUnprepareSpell(spell.id)}
                    >
                      <IoMdClose />
                    </button>
                  )}
                </div>
              )
            })
          ) : (
            <div>No spells prepared</div>
          )}
        </div>
      </div>
    </div>
  )
}

export { SpellsPrepared as default }
