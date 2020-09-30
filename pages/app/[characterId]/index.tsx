import { useRouter } from 'next/router'
import { NextPage } from 'next'
import { useSession } from 'next-auth/client'
import { useEffect } from 'react'

import AppLayout from '../../../components/layouts/app-layout'
import CharacterSheet from '../../../components/character/character-sheet'

const CharacterPage: NextPage = () => {
  const router = useRouter()
  const characterId = router.query.characterId as string
  const [session, loading] = useSession()

  useEffect(() => {
    if (!session && !loading) {
      router.push('/')
    }
  }, [session, loading])

  if (loading) return null

  if (!loading && !session) return <p>Logging you out...</p>

  if (!characterId) return null

  return (
    <AppLayout title="Character Sheet">
      <CharacterSheet id={Number(characterId)} />
    </AppLayout>
  )
}

export { CharacterPage as default }
