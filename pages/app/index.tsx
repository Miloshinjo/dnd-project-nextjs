import { NextPage } from 'next'

import useProtectRoute from '../../hooks/useProtectRoute'
import AppLayout from '../../components/layouts/app-layout'
import SubHeader from '../../components/layout/sub-header'
import CharactersList from '../../components/character/characters-list'

const App: NextPage<{}> = () => {
  useProtectRoute()

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
