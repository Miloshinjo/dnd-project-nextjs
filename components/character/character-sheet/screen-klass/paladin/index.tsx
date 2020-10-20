import React from 'react'

import KlassAbilityTracker from '../klass-ability-tracker'

const Paladin: React.FC = () => {
  return (
    <KlassAbilityTracker
      message="Add or remove divine sense use"
      title="Divine Sense"
      klassName="paladin"
    />
  )
}

export { Paladin as default }
