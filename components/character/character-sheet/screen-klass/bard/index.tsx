import React from 'react'

import KlassAbilityTracker from '../klass-ability-tracker'

const Bard: React.FC = () => {
  return (
    <KlassAbilityTracker
      message="Add or remove inspiration use"
      title="Bardic Inspiration"
      klassName="bard"
    />
  )
}

export { Bard as default }
