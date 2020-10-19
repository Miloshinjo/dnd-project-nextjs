import { seeAllSpellsForKlass } from '../../../../../utils/spells'

import { GiMagicSwirl } from 'react-icons/gi'
import { FiChevronRight } from 'react-icons/fi'

import { useRouter } from 'next/router'
import { Character, Klass } from '../../../../../generated/graphql'

import styles from './styles.module.css'

type Props = {
  characterId: Character['id']
  klassName: Klass['name']
}

const SeeAllSpellsForKlassButton: React.FC<Props> = ({
  characterId,
  klassName,
}) => {
  const router = useRouter()
  return (
    <button
      className={styles.button}
      onClick={() => {
        seeAllSpellsForKlass({
          klassName: klassName,
          characterId: characterId,
          router,
        })
      }}
    >
      <GiMagicSwirl
        size={20}
        className={styles.icon}
        color={`var(--color-${klassName})`}
      />
      <span className={styles.buttonText}>
        <span className="capitalize">{klassName}</span> spell list
      </span>
      <FiChevronRight size={20} />
    </button>
  )
}

export { SeeAllSpellsForKlassButton as default }
