import { useMemo } from 'react'
import { GiMusicSpell, GiHand, GiSwapBag } from 'react-icons/gi'
import { FaPlus } from 'react-icons/fa'

import Link from 'next/link'
import {
  Spell,
  Character,
  CharacterQuery,
  SpellsKlassQuery,
} from '../../../../../generated/graphql'
import { arrangeSpellsByLevel } from '../../../../../utils/spells'
import { useModal } from '../../../../../context/modal'

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
  counter?: number
}

const SpellsKnown: React.FC<Props> = ({
  spells,
  characterId,
  title,
  learnControls = true,
  showSectionTitle = true,
  cannotLearn = false,
  counter = null,
}) => {
  const { openModal } = useModal()

  const spellsByLevel: Pick<
    Spell,
    'id' | 'name' | 'level' | 'castingTime' | 'school' | 'range' | 'components'
  > = useMemo(() => arrangeSpellsByLevel(spells), [spells])

  return (
    <div className={styles.container}>
      <div className="p-2">
        <div className="flex items-center px-4 justify-between">
          <h4 className="text-center">
            {title}{' '}
            {counter && (
              <span className="text-xs opacity-75">
                ({spells.length} of {counter})
              </span>
            )}
          </h4>
          {learnControls && (
            <div className="flex items-end flex-col">
              <Link href={`/spells?character=${characterId}`}>
                <button className={styles.manageSpellsButton}>
                  <FaPlus size={15} />
                </button>
              </Link>
            </div>
          )}
        </div>
        <div className="px-4">
          {Object.keys(spellsByLevel).map((level: string) => {
            return (
              <div key={level} className="mt-4">
                {showSectionTitle && (
                  <h4
                    className={`text-sm font-semibold text-primary-900 border-b border-primary-900 pb-1 mb-4 w-1/3`}
                  >
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
                      | 'school'
                      | 'castingTime'
                      | 'range'
                      | 'components'
                    >,
                  ) => {
                    return (
                      <button
                        type="button"
                        key={spell.id}
                        className={styles.spellContainer}
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
                        <div className={styles.spellTitle}>
                          <span className="font-medium">{spell.name}</span>
                          <span className="text-xs opacity-75">
                            {spell.school}
                          </span>
                        </div>
                        <div className={styles.attributesContainer}>
                          <div className="flex flex-col items-end">
                            <span className="text-xs">{spell.castingTime}</span>
                            <div className="flex items-center">
                              <div className="text-xs ml-1 uppercase flex">
                                {spell.components.split(',').map((component) =>
                                  component === 'v' ? (
                                    <span
                                      className={styles.spellInfoComponentsIcon}
                                      key="v"
                                    >
                                      <GiMusicSpell size={10} />
                                    </span>
                                  ) : component === 's' ? (
                                    <span
                                      className={styles.spellInfoComponentsIcon}
                                      key="s"
                                    >
                                      <GiHand size={10} />
                                    </span>
                                  ) : (
                                    <div
                                      className={styles.spellInfoComponentsIcon}
                                      key="m"
                                    >
                                      <GiSwapBag size={10} />
                                    </div>
                                  ),
                                )}
                              </div>
                              <span className="text-xs ml-1">
                                {spell.range}
                              </span>
                            </div>
                          </div>
                        </div>
                      </button>
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
