import React from 'react'

import KlassAbilityTracker from '../klass-ability-tracker'

type Props = { characterId: number; klassAbilityOne: string }

const Bard: React.FC<Props> = ({ characterId, klassAbilityOne }) => {
  return (
    <KlassAbilityTracker
      message="Add or remove inspiration use"
      title="Bardic Inspiration"
      klassName="bard"
      characterId={characterId}
      klassAbilityOne={klassAbilityOne}
    />
  )
}

export { Bard as default }
