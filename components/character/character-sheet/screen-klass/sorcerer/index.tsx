import React from 'react'

import KlassAbilityTracker from '../klass-ability-tracker'

const Sorcerer: React.FC = () => {
  return (
    <KlassAbilityTracker
      message="Add or remove sorcery points"
      title="Sorcery Points"
      klassName="sorcerer"
    />
  )
}

export { Sorcerer as default }
