import React from 'react'

import KlassAbilityTracker from '../klass-ability-tracker'

const Druid: React.FC = () => {
  return (
    <KlassAbilityTracker
      message="Add or remove wild shape use"
      title="Wild Shape"
      klassName="druid"
    />
  )
}

export { Druid as default }
