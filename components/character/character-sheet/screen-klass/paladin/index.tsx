import React from 'react'

import KlassAbilityTracker from '../klass-ability-tracker'

type Props = { characterId: number; klassAbilityOne: string }

const Paladin: React.FC<Props> = ({ characterId, klassAbilityOne }) => {
  return (
    <KlassAbilityTracker
      message="Add or remove divine sense use"
      title="Divine Sense"
      klassName="paladin"
      characterId={characterId}
      klassAbilityOne={klassAbilityOne}
    />
  )
}

export { Paladin as default }
