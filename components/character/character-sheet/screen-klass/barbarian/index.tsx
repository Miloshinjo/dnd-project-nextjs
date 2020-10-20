import React from 'react'

import KlassAbilityTracker from '../klass-ability-tracker'

const Barbarian: React.FC = () => {
  return (
    <KlassAbilityTracker
      message="Add or remove rage use"
      title="Rage"
      klassName="barbarian"
    />
  )
}

export { Barbarian as default }
