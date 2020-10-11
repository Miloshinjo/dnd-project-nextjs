import { seeAllSpellsForKlass } from '../../../../../utils/spells'

import { useRouter } from 'next/router'
import { Character, Klass } from '../../../../../generated/graphql'

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
      className="inline-flex ml-2"
      onClick={() => {
        seeAllSpellsForKlass({
          klassName: klassName,
          characterId: characterId,
          router,
        })
      }}
    >
      <span className="ml-2 mt-4 underline pb-4">
        <span className="capitalize">{klassName}</span> spell list
      </span>
    </button>
  )
}

export { SeeAllSpellsForKlassButton as default }
