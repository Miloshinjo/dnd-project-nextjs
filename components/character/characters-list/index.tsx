import Link from 'next/link'
import { motion } from 'framer-motion'

import { FaPlus } from 'react-icons/fa'
import Loader from '../../layout/loader'
import CharacterCard from '../character-card'
import CharactersListSkeleton from '../../skeletons/characters-list'
import { Character, useCharactersQuery } from '../../../generated/graphql'

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

const CharactersList = () => {
  const [result] = useCharactersQuery()

  if (result.error) {
    console.log(result.error)
    return <div>{result?.error?.message || 'Unknown error occurred'}</div>
  }

  if (result.fetching) {
    return <CharactersListSkeleton />
  }

  return (
    <motion.div
      variants={listVariants}
      animate="show"
      initial="hidden"
      className={styles.container}
    >
      {result.data.characters.length ? (
        result.data.characters.map((character: Character) => (
          <CharacterCard
            key={character.id}
            character={character}
            itemVariants={itemVariants}
          />
        ))
      ) : (
        <p>Start by creating your first character.</p>
      )}
      <Link href="/app/create-character">
        <motion.a
          className={styles.createCharacterButton}
          variants={itemVariants}
          whileHover={{ y: '-1px' }}
          whileTap={{ y: '1px' }}
        >
          <FaPlus size={20} />
        </motion.a>
      </Link>
    </motion.div>
  )
}

export { CharactersList as default }
