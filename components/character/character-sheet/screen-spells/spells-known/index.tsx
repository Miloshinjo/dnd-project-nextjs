import { useMemo } from 'react'
import Link from 'next/link'
import {
  Spell,
  Character,
  CharacterQuery,
  SpellsKlassQuery,
} from '../../../../../generated/graphql'
import { arrangeSpellsByLevel } from '../../../../../utils/spells'
import { useModal } from '../../../../../context/modal'

import { formatCastingTimes } from '../../../../../utils/formatters'
import styles from './styles.module.css'

type Props = {
  spells: CharacterQuery['character']['spells'] | SpellsKlassQuery['spells']
  characterId: Character['id']
  title: string
  learnControls?: boolean
  showSectionTitle?: boolean
  canPrepareOverride?: boolean
  canLearnOverride?: boolean
  cannotLearn?: boolean
}

const SpellsKnown: React.FC<Props> = ({
  spells,
  characterId,
  title,
  learnControls = true,
  showSectionTitle = true,
  cannotLearn = false,
}) => {
  const { openModal } = useModal()

  const spellsByLevel: Pick<
    Spell,
    'id' | 'name' | 'level' | 'concentration' | 'ritual' | 'castingTime'
  > = useMemo(() => arrangeSpellsByLevel(spells), [spells])

  return (
    <div className={styles.container}>
      <div className="p-2">
        <div className="flex items-center px-4 justify-between">
          <h4 className="text-center font-medium text-gray-600">{title}</h4>

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
                {showSectionTitle && (
                  <h4 className="text-sm font-medium text-gray-600 mb-2">
                    {level === '0' ? 'Cantrips' : `Level ${level}`}
                  </h4>
                )}

                {spellsByLevel[level].map(
                  (
                    spell: Pick<
                      Spell,
                      | 'id'
                      | 'name'
                      | 'level'
                      | 'concentration'
                      | 'ritual'
                      | 'castingTime'
                    >,
                  ) => {
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
                                  cannotLearn,
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
                          {spell.castingTime && (
                            <span className="ml-2 px-1 bg-gray-300 uppercase rounded text-xs font-semibold">
                              {formatCastingTimes(spell.castingTime)}
                            </span>
                          )}
                        </div>
                      </div>
                    )
                  },
                )}
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}

export { SpellsKnown as default }
