import { CharacterUI } from '../../../../models/character'

import { motion } from 'framer-motion'

import { subclassTitle } from '../../../../utils/character'
import { useModal } from '../../../../context/modal'
import DeleteButton from '../../../buttons/delete-button'
import AddButton from '../../../buttons/add-button'

import styles from './styles.module.css'

const screenVariants = {
  initial: { x: '100vw' },
  animate: {
    x: '0',
    transition: { duration: 0.3, ease: 'easeIn' },
  },
}

type Props = {
  character: CharacterUI
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
      <div className="p-6">
        <div className="mb-8">
          <h3 className=" font-medium mb-1">
            {subclassTitle[character.klass.name]}
          </h3>
          {character?.subclass ? (
            <button
              type="button"
              className="font-bold"
              onClick={() => {
                openModal({
                  type: 'addSubclass',
                  props: {
                    originalValue: {
                      id: character.subclass.id,
                      label: character.subclass.name,
                    },
                    characterId: character.id,
                    klassName: character.klass.name,
                  },
                })
              }}
            >
              {character.subclass.name}
            </button>
          ) : (
            <>
              <p className="mb-4">You didn&apos;t pick a one yet.</p>
              <AddButton
                onClick={() => {
                  openModal({
                    type: 'addSubclass',
                    props: {
                      originalValue: {
                        id: character?.subclass?.id,
                        label: character?.subclass?.name,
                      },
                      characterId: character.id,
                      klassName: character.klass.name,
                    },
                  })
                }}
              >
                Pick {subclassTitle[character.klass.name]}
              </AddButton>
            </>
          )}
        </div>
        <div>
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
