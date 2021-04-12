import { useModal } from '../../../../../../context/modal'
import {
  Character,
  useSpeedMutation,
} from '../../../../../../generated/graphql'

import styles from './styles.module.css'

type Props = {
  characterId: Character['id']
  speed: Character['speed']
}

const Speed: React.FC<Props> = ({ characterId, speed }) => {
  const { openModal } = useModal()

  return (
    <button
      type="button"
      className={styles.container}
      onClick={() =>
        openModal({
          type: 'number',
          props: {
            originalValue: speed,
            characterId,
            title: 'Speed',
            type: 'speed',
            mutation: useSpeedMutation,
          },
        })
      }
    >
      <div className={styles.label}>Speed</div>
      <div className={styles.value}>{speed}</div>
    </button>
  )
}

export { Speed as default }
