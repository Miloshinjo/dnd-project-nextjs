import { useEffect } from 'react'
import { NextPage } from 'next'
import { useSession } from 'next-auth/client'
import { useRouter } from 'next/router'

import AppLayout from '../../components/layouts/app-layout'
import SubHeader from '../../components/layout/sub-header'
import CharactersList from '../../components/character/characters-list'
import LoadingPage from '../../components/layout/loading-page'

const App: NextPage<{}> = () => {
  const [session, loading] = useSession()
  const router = useRouter()

  useEffect(() => {
    if (!session && !loading) {
      router.push('/')
    }
  }, [session, loading])

  if (loading) return <LoadingPage />

  if (!loading && !session) return <p>Logging you out...</p>

  return (
    <AppLayout title="Home">
      <SubHeader text1="Welcome,">
        <span className="text-primary-600">adventurer</span>!
      </SubHeader>
      <div className="p-4">
        <CharactersList />
      </div>
    </AppLayout>
  )
}

export { App as default }
