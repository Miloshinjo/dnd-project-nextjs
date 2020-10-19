import { useMemo, useState } from 'react'
import { GiMusicSpell, GiHand, GiSwapBag } from 'react-icons/gi'
import { FiChevronDown } from 'react-icons/fi'
import { motion } from 'framer-motion'

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
  cannotLearn?: boolean
  counter?: number
  noSpellsMessage: string
}

const SpellsKnown: React.FC<Props> = ({
  spells,
  characterId,
  title,
  cannotLearn = false,
  counter = null,
  noSpellsMessage,
}) => {
  const { openModal } = useModal()
  const [active, setActive] = useState(false)

  const spellsByLevel: Pick<
    Spell,
    'id' | 'name' | 'level' | 'castingTime' | 'school' | 'range' | 'components'
  > = useMemo(() => arrangeSpellsByLevel(spells), [spells])

  return (
    <div className={styles.container}>
      <button
        className="flex items-center p-4 justify-between w-full"
        type="button"
        onClick={() => {
          setActive(!active)
        }}
      >
        <h4 className="text-center">
          {title}{' '}
          <span className={styles.spellCountText}>
            ({counter ? `${spells.length} of ${counter}` : spells.length})
          </span>
        </h4>

        <motion.div
          className="flex items-end flex-col"
          animate={active ? 'active' : 'inactive'}
          variants={{
            active: {
              rotate: 180,
            },
            inactive: {
              rotate: 0,
            },
          }}
        >
          <FiChevronDown />
        </motion.div>
      </button>
      {active &&
        (Object.keys(spellsByLevel).length === 0 ? (
          <div className={styles.noSpellsText}>{noSpellsMessage}</div>
        ) : (
          <div className="px-4">
            {Object.keys(spellsByLevel).map((level: string) => {
              return (
                <div key={level} className="mt-4">
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
                              lvl {spell.level} {spell.school}
                            </span>
                          </div>
                          <div className={styles.attributesContainer}>
                            <div className="flex flex-col items-end">
                              <span className="text-xs">
                                {spell.castingTime}
                              </span>
                              <div className="flex items-center">
                                <div className="text-xs ml-1 uppercase flex">
                                  {spell.components
                                    .split(',')
                                    .map((component) =>
                                      component === 'v' ? (
                                        <span
                                          className={
                                            styles.spellInfoComponentsIcon
                                          }
                                          key="v"
                                        >
                                          <GiMusicSpell size={10} />
                                        </span>
                                      ) : component === 's' ? (
                                        <span
                                          className={
                                            styles.spellInfoComponentsIcon
                                          }
                                          key="s"
                                        >
                                          <GiHand size={10} />
                                        </span>
                                      ) : (
                                        <div
                                          className={
                                            styles.spellInfoComponentsIcon
                                          }
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
        ))}
    </div>
  )
}

export { SpellsKnown as default }
