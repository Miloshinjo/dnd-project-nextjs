import { motion } from 'framer-motion'

import { useModal } from '../../../../../context/modal'
import { CharacterQuery } from '../../../../../generated/graphql'
import DeleteButton from '../../../../buttons/delete-button'

import styles from './styles.module.css'

const screenVariants = {
  initial: { x: '100vw' },
  animate: {
    x: '0',
    transition: { duration: 0.3, ease: 'easeIn' },
  },
}

type Props = {
  character: CharacterQuery['character']
}

const ScreenSettings: React.FC<Props> = ({ character }) => {
  const { openModal } = useModal()

  return (
    <motion.div
      variants={screenVariants}
      animate="animate"
      initial="initial"
      className={styles.container}
    >
      <div className="p-4">
        <div className="px-2 py-4">
          <h3 className="font-medium mb-1">Delete character</h3>
          <p className="mb-4 text-sm">
            This action is irreversible, deleted characters cannot be restored.
            Tread lightly.
          </p>
          <DeleteButton
            onClick={() => {
              openModal({
                type: 'deleteCharacter',
                props: {
                  characterId: character.id,
                  name: character.name,
                },
              })
            }}
          >
            Delete
          </DeleteButton>
        </div>
      </div>
    </motion.div>
  )
}

export { ScreenSettings as default }
