import React from 'react'

import KlassAbilityTracker from '../klass-ability-tracker'

type Props = { characterId: number; klassAbilityOne: string }

const Barbarian: React.FC<Props> = ({ characterId, klassAbilityOne }) => {
  return (
    <KlassAbilityTracker
      message="Add or remove rage use"
      title="Rage"
      klassName="barbarian"
      characterId={characterId}
      klassAbilityOne={klassAbilityOne}
    />
  )
}

export { Barbarian as default }
