import { useMemo } from 'react'
import Link from 'next/link'
import {
  Spell,
  Character,
  CharacterQuery,
  usePrepareSpellMutation,
} from '../../../../../generated/graphql'
import { arrangeSpellsByLevel } from '../../../../../utils/spells'
import { useModal } from '../../../../../context/modal'
import styles from './styles.module.css'

type Props = {
  // spells: Pick<Spell, 'id' | 'name' | 'level' | 'concentration' | 'ritual'>
  spells: CharacterQuery['character']['spells']
  characterId: Character['id']
  title: string
  learnControls?: boolean
  spellsPreparedIds?: Array<Spell['id']>
  spellsPrepareMode?: boolean
}

const SpellsKnown: React.FC<Props> = ({
  spells,
  characterId,
  title,
  learnControls = true,
  spellsPreparedIds = [],
  spellsPrepareMode = false,
}) => {
  const { openModal } = useModal()

  const [, prepareSpell] = usePrepareSpellMutation()

  const handlePrepareSpell = async (spellId: Spell['id']): Promise<void> => {
    const result = await prepareSpell({ id: characterId, spellId })

    if (result.error) {
      console.log(result.error)
    }
  }

  const spellsByLevel: Pick<
    Spell,
    'id' | 'name' | 'level' | 'concentration' | 'ritual'
  > = useMemo(() => arrangeSpellsByLevel(spells), [spells])

  return (
    <div className={styles.container}>
      <div className="p-2">
        <div className="flex items-center px-4 justify-between">
          <h4 className="text-center text-sm font-medium text-gray-600">
            {title}
          </h4>
          {learnControls && (
            <div className="flex items-end flex-col">
              <Link href={`/spells?character=${characterId}`}>
                <button className={styles.learnSpellsButton}>
                  Learn Spells
                </button>
              </Link>
            </div>
          )}
        </div>
        <div className="px-4 mt-4">
          {Object.keys(spellsByLevel).map((level: string) => {
            return (
              <div key={level} className="mb-4">
                <h4 className="text-xs font-medium text-gray-600 mb-2">
                  {level === '0' ? 'Cantrips' : `Level ${level}`}
                </h4>

                {spellsByLevel[level].map((spell) => {
                  return (
                    <div key={spell.id} className="mb-2 flex items-center">
                      <div>
                        <button
                          type="button"
                          onClick={() =>
                            openModal({
                              type: 'spellPage',
                              props: {
                                spellId: spell.id,
                                characterId,
                              },
                            })
                          }
                        >
                          {spell.name}
                        </button>
                        {spell.concentration && (
                          <span className="ml-2 px-1 bg-gray-300 uppercase rounded text-xs font-semibold">
                            c
                          </span>
                        )}
                        {spell.ritual && (
                          <span className="ml-2 px-1 bg-gray-300 uppercase rounded text-xs font-semibold">
                            r
                          </span>
                        )}
                      </div>
                      {spellsPrepareMode &&
                        spell.level !== 0 &&
                        !spellsPreparedIds.includes(spell.id) && (
                          <button
                            type="button"
                            className="text-gray-600 ml-auto text-xs"
                            onClick={() => {
                              handlePrepareSpell(spell.id)
                            }}
                          >
                            Prepare
                          </button>
                        )}
                    </div>
                  )
                })}
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}

export { SpellsKnown as default }
