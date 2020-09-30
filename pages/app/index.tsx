import { useEffect } from 'react'
import { NextPage } from 'next'
import { useSession } from 'next-auth/client'
import { useRouter } from 'next/router'

import AppLayout from '../../components/layouts/app-layout'
import SubHeader from '../../components/layout/sub-header'
import CharactersList from '../../components/character/characters-list'

const App: NextPage<{}> = () => {
  const [session, loading] = useSession()
  const router = useRouter()

  useEffect(() => {
    if (!session && !loading) {
      router.push('/')
    }
  }, [session, loading])

  if (loading) return null

  if (!loading && !session) return <p>Logging you out...</p>

  return (
    <AppLayout title="Home">
      <SubHeader text1="Welcome,">
        <span className="text-red-600">adventurer</span>!
      </SubHeader>
      <div className="p-4">
        <CharactersList />
      </div>
    </AppLayout>
  )
}

export { App as default }
