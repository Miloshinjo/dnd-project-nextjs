import React from 'react'

import KlassAbilityTracker from '../klass-ability-tracker'

type Props = { characterId: number; klassAbilityOne: Array<boolean> }

const Druid: React.FC<Props> = ({ characterId, klassAbilityOne }) => {
  return (
    <KlassAbilityTracker
      message="Add or remove wild shape use"
      title="Wild Shape"
      klassName="druid"
      characterId={characterId}
      klassAbilityOne={klassAbilityOne}
    />
  )
}

export { Druid as default }
