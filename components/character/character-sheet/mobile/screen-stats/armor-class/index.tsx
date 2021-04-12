import { useModal } from '../../../../../../context/modal'
import {
  Character,
  useArmorClassMutation,
} from '../../../../../../generated/graphql'

import styles from './styles.module.css'

type Props = {
  characterId: Character['id']
  armorClass: Character['armorClass']
}

const ArmorClass: React.FC<Props> = ({ armorClass, characterId }) => {
  const { openModal } = useModal()

  return (
    <button
      type="button"
      className={styles.container}
      onClick={() =>
        openModal({
          type: 'number',
          props: {
            originalValue: armorClass,
            characterId,
            title: 'Armor Class',
            type: 'armorClass',
            mutation: useArmorClassMutation,
          },
        })
      }
    >
      <div className={styles.label}>AC</div>
      <div className={styles.value}>{armorClass}</div>
    </button>
  )
}

export default ArmorClass
