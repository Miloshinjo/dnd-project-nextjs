import { NextPage } from 'next'

import { useRouter } from 'next/router'
import { useEffect } from 'react'

import CharactersList from '../../components/character/characters-list'
import LoadingPage from '../../components/layout/loading-page'
import SubHeader from '../../components/layout/sub-header'
import SubHeaderDesktop from '../../components/layout/sub-header-desktop'
import AppLayout from '../../components/layouts/app-layout'
import { useSession } from '../../lib/next-auth/client'

import styles from './styles.module.css'

const App: NextPage = () => {
  const [session, loading] = useSession()
  const router = useRouter()

  useEffect(() => {
    if (!session && !loading) {
      router.push('/')
    }
  }, [session, loading, router])

  if (loading) return <LoadingPage />

  if (!loading && !session) return <p>Logging you out...</p>

  return (
    <AppLayout title="Home">
      <SubHeader text1="Welcome,">
        <span className="text-primary-600">adventurer</span>!
      </SubHeader>
      <SubHeaderDesktop>Characters</SubHeaderDesktop>
      <div className={styles.contentContainer}>
        <CharactersList />
      </div>
    </AppLayout>
  )
}

export { App as default }
