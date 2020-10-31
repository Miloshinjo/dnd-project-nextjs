import { useModal } from '../../../context/modal'
import { useDeleteMagicItemMutation } from '../../../generated/graphql'

import styles from './styles.module.css'

const DeleteMagicItem = ({ magicItemId, name }) => {
  const { closeModal } = useModal()
  const [deleteMagicItemResult, deleteMagicItem] = useDeleteMagicItemMutation()

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Delete Magic Item</h1>
      <div className={styles.message}>
        Are you absolutely sure you want to delete <strong>{name}</strong>?
      </div>

      <div className="grid grid-cols-2 gap-x-2 mt-4">
        <button
          type="button"
          className={styles.mainButton}
          onClick={() => {
            deleteMagicItem({ id: magicItemId }).then((result) => {
              if (result.error) {
                console.log(result.error)
                return
              }

              closeModal()
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

export { DeleteMagicItem as default }
