import { useRouter } from 'next/router'

import { useModal } from '../../../context/modal'
import { useDeleteCharacterMutation } from '../../../generated/graphql'

import styles from './styles.module.css'

const DeleteCharacter = ({ characterId, name }) => {
  const router = useRouter()
  const { closeModal } = useModal()
  const [, deleteCharacter] = useDeleteCharacterMutation()

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Delete Character</h1>
      <div className={styles.message}>
        Are you absolutely sure you want to delete <strong>{name}</strong>?
      </div>

      <div className="grid grid-cols-2 gap-x-2 mt-4">
        <button
          type="button"
          className={styles.mainButton}
          onClick={() => {
            deleteCharacter({ id: characterId }).then((result) => {
              if (result.error) {
                console.log(result.error)
                return
              }

              router.push('/app')
            })
          }}
        >
          Delete
        </button>
        <button
          type="button"
          onClick={closeModal}
          className={styles.cancelButton}
        >
          Cancel
        </button>
      </div>
    </div>
  )
}

export { DeleteCharacter as default }
