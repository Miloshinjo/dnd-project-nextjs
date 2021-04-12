import React from 'react'

import KlassAbilityTracker from '../klass-ability-tracker'

type Props = { characterId: number; klassAbilityOne: string }

const Sorcerer: React.FC<Props> = ({ characterId, klassAbilityOne }) => {
  return (
    <KlassAbilityTracker
      message="Add or remove sorcery points"
      title="Sorcery Points"
      klassName="sorcerer"
      characterId={characterId}
      klassAbilityOne={klassAbilityOne}
    />
  )
}

export { Sorcerer as default }
