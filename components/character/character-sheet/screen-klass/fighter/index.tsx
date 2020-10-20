import React from 'react'

import KlassAbilityTracker from '../klass-ability-tracker'

const Fighter: React.FC = () => {
  return (
    <KlassAbilityTracker
      message="Add or remove Action Surge use"
      title="Action Surge"
      klassName="fighter"
    />
  )
}

export { Fighter as default }
