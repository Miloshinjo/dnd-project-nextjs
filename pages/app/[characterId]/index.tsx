import { useRouter } from 'next/router'
import { NextPage } from 'next'

import AppLayout from '../../../components/layouts/app-layout'
import CharacterSheet from '../../../components/character/character-sheet'

const CharacterPage: NextPage = () => {
  const router = useRouter()
  const characterId = router.query.characterId as string

  if (!characterId) return null

  return (
    <AppLayout title="Character Sheet">
      <CharacterSheet id={characterId} />
    </AppLayout>
  )
}

export { CharacterPage as default }
