import { useState, useCallback } from 'react'

import { CharacterQuery, SkillsQuery } from '../../../../generated/graphql'
import { ActiveKey } from '../../../../models/misc'

import Nav from './nav'
import ScreenInventory from './screen-inventory'
import ScreenKlass from './screen-klass'
import ScreenSettings from './screen-settings'
import ScreenSpells from './screen-spells'
import ScreenStats from './screen-stats'

import styles from './styles.module.css'

type Props = {
  character: CharacterQuery['character']
  skills: SkillsQuery['skills']
}

const SheetMobile: React.FC<Props> = ({ character, skills }) => {
  const getActiveKey = (): ActiveKey => {
    if (!localStorage.getItem('activeCharacterScreen')) return 'stats'

    const [characterId, activeKey] = localStorage
      .getItem('activeCharacterScreen')
      .split(',')

    if (!characterId || !activeKey) return 'stats'

    if (character.id === Number(characterId)) {
      return activeKey as ActiveKey
    } else {
      return 'stats'
    }
  }

  const [activeKey, setActiveKey] = useState<ActiveKey>(
    (getActiveKey() as ActiveKey) || 'stats',
  )

  const setActiveKeyAndStore = useCallback(
    (key: ActiveKey) => {
      setActiveKey(key)
      localStorage.setItem('activeCharacterScreen', `${character.id},${key}`)
    },
    [character.id],
  )

  const screens = {
    stats: <ScreenStats character={character} skills={skills} />,
    class: <ScreenKlass character={character} />,
    spells: <ScreenSpells character={character} />,
    inventory: (
      <ScreenInventory
        characterId={character.id}
        magicItems={character.magicItems}
        gold={character.gold}
      />
    ),
    settings: <ScreenSettings character={character} />,
  }

  return (
    <>
      <div className={styles.screensContainer}>{screens[activeKey]}</div>
      <Nav
        activeKey={activeKey}
        setActiveKeyAndStore={setActiveKeyAndStore}
        isSpellcaster={
          !!character.subclass?.spellCastingModifier ||
          !!character.klass.spellCastingModifier
        }
        klassName={character.klass.name.toLowerCase()}
      />{' '}
    </>
  )
}

export { SheetMobile as default }
