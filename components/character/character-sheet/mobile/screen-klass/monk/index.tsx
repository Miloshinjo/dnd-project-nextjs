import React from 'react'

import KlassAbilityTracker from '../klass-ability-tracker'

type Props = { characterId: number; klassAbilityOne: string }

const Monk: React.FC<Props> = ({ characterId, klassAbilityOne }) => {
  return (
    <KlassAbilityTracker
      message="Add or remove Ki points"
      title="Ki Points"
      klassName="monk"
      characterId={characterId}
      klassAbilityOne={klassAbilityOne}
    />
  )
}

export { Monk as default }
