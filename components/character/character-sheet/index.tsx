import { useState, useCallback } from 'react'

import {
  Character,
  useCharacterQuery,
  useSkillsQuery,
} from '../../../generated/graphql'
import { ActiveKey } from '../../../models/misc'
import TextLoader from '../../layout/text-loader'

import CharacterHeader from './common/header'
import Nav from './nav'

import ScreenInventory from './screen-inventory'
import ScreenKlass from './screen-klass'
import ScreenSettings from './screen-settings'
import ScreenSpells from './screen-spells'
import ScreenStats from './screen-stats'

import styles from './styles.module.css'

type Props = {
  id: Character['id']
}

const CharacterSheet: React.FC<Props> = ({ id }) => {
  const [characterResult] = useCharacterQuery({ variables: { id } })
  const [skillsResult] = useSkillsQuery()

  const getActiveKey = (): ActiveKey => {
    if (!localStorage.getItem('activeCharacterScreen')) return 'stats'

    const [characterId, activeKey] = localStorage
      .getItem('activeCharacterScreen')
      .split(',')

    if (!characterId || !activeKey) return 'stats'

    if (id === Number(characterId)) {
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
      localStorage.setItem('activeCharacterScreen', `${id},${key}`)
    },
    [id],
  )

  if (characterResult.error || skillsResult.error) {
    console.log(characterResult.error)
    return <div>{'An error occurred loading your character'}</div>
  }

  if (characterResult.fetching || skillsResult.fetching) {
    return (
      <div className={styles.fetchingContainer}>
        <TextLoader text="Fetching character sheet" />
      </div>
    )
  }

  const { character } = characterResult.data
  const { skills } = skillsResult.data

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
    <div className={styles.container}>
      <CharacterHeader character={character} />
      <div className={styles.screensContainer}>{screens[activeKey]}</div>
      <Nav
        activeKey={activeKey}
        setActiveKeyAndStore={setActiveKeyAndStore}
        isSpellcaster={
          !!character.subclass?.spellCastingModifier ||
          !!character.klass.spellCastingModifier
        }
        klassName={character.klass.name.toLowerCase()}
      />
    </div>
  )
}

export { CharacterSheet as default }
