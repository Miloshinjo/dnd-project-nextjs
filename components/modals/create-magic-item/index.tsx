import ModalHeader from '../../modal/modal-header'
import { Character } from '../../../generated/graphql'

import CreateMagicItemForm from '../../forms/create-magic-item'

import styles from './styles.module.css'

type Props = {
  characterId: Character['id']
}

const CreateMagicItem: React.FC<Props> = ({ characterId }) => {
  return (
    <>
      <ModalHeader type="createMagicItem" title="Add Magic Item" />
      <div className={styles.container}>
        <CreateMagicItemForm characterId={characterId} />
      </div>
    </>
  )
}

export { CreateMagicItem as default }
