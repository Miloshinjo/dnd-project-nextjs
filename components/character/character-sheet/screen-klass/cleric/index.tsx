import React from 'react'

import KlassAbilityTracker from '../klass-ability-tracker'

type Props = { characterId: number; klassAbilityOne: string }

const Cleric: React.FC<Props> = ({ characterId, klassAbilityOne }) => {
  return (
    <KlassAbilityTracker
      message="Add or remove channel divinity use"
      title="Channel Divinity"
      klassName="cleric"
      characterId={characterId}
      klassAbilityOne={klassAbilityOne}
    />
  )
}

export { Cleric as default }
