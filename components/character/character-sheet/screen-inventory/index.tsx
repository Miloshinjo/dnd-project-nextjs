import { motion } from 'framer-motion'
import React from 'react'
import { GiTwoCoins } from 'react-icons/gi'

import { Character, useGoldMutation } from '../../../../generated/graphql'
import OpenModalButton from '../../../buttons/open-modal-button'

import MagicItems from './magic-items'

import styles from './styles.module.css'

const screenVariants = {
  initial: { x: '100vw' },
  animate: {
    x: '0',
    transition: { duration: 0.3, ease: 'easeIn' },
  },
}

type Props = {
  characterId: Character['id']
  magicItems: Array<any>
  gold: Character['gold']
}

const ScreenInventory: React.FC<Props> = ({
  characterId,
  magicItems,
  gold,
}) => {
  return (
    <motion.div variants={screenVariants} animate="animate" initial="initial">
      <OpenModalButton
        className={styles.goldPieces}
        type="number"
        props={{
          originalValue: gold || 0,
          characterId,
          title: 'Gold Pieces',
          type: 'gold',
          mutation: useGoldMutation,
        }}
      >
        <GiTwoCoins className={styles.icon} />
        {gold || 0}
      </OpenModalButton>
      <MagicItems magicItems={magicItems} characterId={characterId} />
    </motion.div>
  )
}

export { ScreenInventory as default }
