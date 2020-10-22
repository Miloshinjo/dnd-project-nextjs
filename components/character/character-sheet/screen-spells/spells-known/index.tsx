import { useState } from 'react'
import { GiMusicSpell, GiHand, GiSwapBag } from 'react-icons/gi'
import { FiChevronDown } from 'react-icons/fi'
import { motion } from 'framer-motion'

import {
  Spell,
  Character,
  CharacterQuery,
  SpellsKlassQuery,
} from '../../../../../generated/graphql'
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
  const [active, setActive] = useState(true)

  return (
    <div className={styles.container}>
      <button
        className="flex items-center p-4 justify-between w-full"
        type="button"
        onClick={() => {
          setActive(!active)
        }}
      >
        <h3 className="statSectionHeading">
          {title}{' '}
          <span className={styles.spellCountText}>
            ({counter ? `${spells.length} of ${counter}` : spells.length})
          </span>
        </h3>

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
        (spells.length === 0 ? (
          <div className={styles.noSpellsText}>{noSpellsMessage}</div>
        ) : (
          <div className="px-4">
            {(spells as Array<
              Pick<
                Spell,
                | 'id'
                | 'level'
                | 'name'
                | 'school'
                | 'castingTime'
                | 'components'
                | 'range'
                | 'concentration'
                | 'ritual'
              >
            >).map(
              (
                spell: Pick<
                  Spell,
                  | 'id'
                  | 'level'
                  | 'name'
                  | 'school'
                  | 'castingTime'
                  | 'components'
                  | 'range'
                  | 'concentration'
                  | 'ritual'
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
                      <div className="font-medium flex">
                        {spell.name}
                        {(spell.concentration || spell.ritual) && (
                          <div className="ml-4 flex items-center">
                            {spell.concentration && (
                              <span className={`${styles.badge} mr-2`}>
                                {spell.concentration && 'c'}
                              </span>
                            )}
                            {spell.ritual && (
                              <span className={styles.badge}>r</span>
                            )}
                          </div>
                        )}
                      </div>
                      <span className="text-xs opacity-75">
                        {spell.level > 0
                          ? `lvl ${spell.level} ${spell.school}`
                          : `${spell.school}`}
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
                          <span className="text-xs ml-1">{spell.range}</span>
                        </div>
                      </div>
                    </div>
                  </button>
                )
              },
            )}
          </div>
        ))}
    </div>
  )
}

export { SpellsKnown as default }
