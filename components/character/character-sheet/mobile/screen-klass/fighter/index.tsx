import React from 'react'

import KlassAbilityTracker from '../klass-ability-tracker'

type Props = { characterId: number; klassAbilityOne: string }

const Fighter: React.FC<Props> = ({ characterId, klassAbilityOne }) => {
  return (
    <KlassAbilityTracker
      message="Add or remove Action Surge use"
      title="Action Surge"
      klassName="fighter"
      characterId={characterId}
      klassAbilityOne={klassAbilityOne}
    />
  )
}

export { Fighter as default }
