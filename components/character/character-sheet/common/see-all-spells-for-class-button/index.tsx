import { useMemo } from 'react'
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
  const parsedKlassName = useMemo(() => {
    if (klassName === 'Arcane Trickster') return 'wizard'
    if (klassName === 'Eldritch Knight') return 'wizard'
    return klassName.toLowerCase()
  }, [klassName])

  return (
    <button
      className={styles.button}
      onClick={() => {
        seeAllSpellsForKlass({
          klassName: parsedKlassName,
          characterId: characterId,
          router,
        })
      }}
    >
      <GiMagicSwirl
        size={20}
        className={styles.icon}
        color={`var(--color-${parsedKlassName})`}
      />
      <span className={styles.buttonText}>
        <span className="capitalize">{klassName}</span> spell list
      </span>
      <FiChevronRight size={20} />
    </button>
  )
}

export { SeeAllSpellsForKlassButton as default }
