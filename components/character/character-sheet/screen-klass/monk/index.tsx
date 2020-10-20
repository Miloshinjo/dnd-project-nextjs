import React from 'react'

import KlassAbilityTracker from '../klass-ability-tracker'

const Monk: React.FC = () => {
  return (
    <KlassAbilityTracker
      message="Add or remove Ki points"
      title="Ki Points"
      klassName="monk"
    />
  )
}

export { Monk as default }
