import { useCallback, useState } from 'react'

import { Character } from '../generated/graphql'

import { ActiveCharacterScreen } from '../models/misc'

const useGetActiveCharacterScreen = (
  characterId: Character['id'],
): [ActiveCharacterScreen, (screenKey: ActiveCharacterScreen) => void] => {
  const getActiveCharacterScreen = (): ActiveCharacterScreen => {
    if (!localStorage.getItem('activeCharacterScreen')) return 'stats'

    const [storageCharacterId, activeKey] = localStorage
      .getItem('activeCharacterScreen')
      .split(',')

    if (!storageCharacterId || !activeKey) return 'stats'

    if (characterId === Number(storageCharacterId)) {
      return activeKey as ActiveCharacterScreen
    } else {
      return 'stats'
    }
  }

  const [activeCharacterScreen, setActiveCharacterScreen] = useState<
    ActiveCharacterScreen
  >((getActiveCharacterScreen() as ActiveCharacterScreen) || 'stats')

  const setActiveCharacterScreenAndStore = useCallback(
    (screenKey: ActiveCharacterScreen) => {
      setActiveCharacterScreen(screenKey)
      localStorage.setItem(
        'activeCharacterScreen',
        `${characterId},${screenKey}`,
      )
    },
    [characterId],
  )

  return [activeCharacterScreen, setActiveCharacterScreenAndStore]
}

export { useGetActiveCharacterScreen as default }
