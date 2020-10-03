import React from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { IoIosClose } from 'react-icons/io'

import {
  Spell,
  Character,
  useCharactersQuery,
  useLearnSpellMutation,
} from '../../../generated/graphql'
import Loader from '../../layout/loader'

import { GiSpellBook } from 'react-icons/gi'

import { useModal } from '../../../context/modal'

import styles from './styles.module.css'

const listVariants = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.2 } },
}

const itemVariants = {
  hidden: {
    opacity: 0,
    y: 40,
  },
  show: { opacity: 1, y: 0, transition: { duration: 0.4 } },
}

type Props = {
  spellId: Spell['id']
}

const LearnSpell: React.FC<Props> = ({ spellId }) => {
  const { closeModal } = useModal()

  const [charactersResult] = useCharactersQuery()
  const [learnSpellResult, learnSpell] = useLearnSpellMutation()

  if (charactersResult.fetching) {
    return (
      <div className="m-8">
        <Loader />
      </div>
    )
  }

  if (charactersResult.error) {
    console.log(charactersResult.error)
    return (
      <div>{charactersResult?.error?.message || 'Unknown error occurred'}</div>
    )
  }

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div className={styles.headerTitle}>
          <GiSpellBook size={20} color="#fff" />
          <h1 className={styles.heading}>Pick character</h1>
        </div>
        <button className={styles.close} onClick={closeModal}>
          <IoIosClose size={25} />
        </button>
      </div>

      {learnSpellResult.fetching ? (
        <div className="p-4 flex items-center justify-center flex-col">
          <span className="mb-2">Learning new spell...</span>
          <Loader />
        </div>
      ) : learnSpellResult.data ? (
        <div className={styles.spellLearnt}>
          <h4 className={styles.spellLearntHeading}>
            <span className="font-semibold">
              {learnSpellResult.data.learnSpell.name}
            </span>{' '}
            has learned a new spell!
          </h4>
          <Link href={`/app/${learnSpellResult.data.learnSpell.id}`}>
            <a className={styles.spellLearntLink}>Go to character</a>
          </Link>
        </div>
      ) : (
        <motion.div
          variants={listVariants}
          animate="show"
          initial="hidden"
          className={styles.listContainer}
        >
          {charactersResult.data.characters.map((character: Character) => {
            if (
              !character.subclass?.spellCastingModifier &&
              !character.klass.spellCastingModifier
            ) {
              return null
            }

            if (character.spells.map((spell) => spell.id).includes(spellId)) {
              return null
            }

            return (
              <motion.button
                className={styles.characterCard}
                variants={itemVariants}
                key={character.id}
                type="button"
                onClick={async () => {
                  const result = await learnSpell({
                    id: `${character.id}`,
                    spellId: `${spellId}`,
                  })

                  if (result.error) {
                    console.log('An error occured')
                    return
                  }
                }}
              >
                <div className="w-8 h-8 rounded-full flex p-1 mr-2 bg-gray-800">
                  <img
                    src={`/images/classes/${character.klass.name.toLowerCase()}.png`}
                    alt="class name"
                  />
                </div>
                <div className="flex flex-col items-start">
                  <div className="font-bold">{character.name}</div>
                  <div className="text-xs text-gray-500">
                    {character.subclass?.name
                      ? character.subclass?.name
                      : character.klass.name}
                  </div>
                </div>
              </motion.button>
            )
          })}
        </motion.div>
      )}
    </div>
  )
}

export { LearnSpell as default }
