import { useState, useCallback } from 'react'

import Loader from '../../layout/loader'
import Nav from './nav'
import { ActiveKey } from '../../../models/misc'
import {
  Character,
  useCharacterQuery,
  useSkillsQuery,
} from '../../../generated/graphql'

import ScreenStats from './screen-stats'
import ScreenSkills from './screen-skills'
import ScreenSpells from './screen-spells'
import ScreenSettings from './screen-settings'
import CharacterHeader from './common/header'

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
        <Loader />
      </div>
    )
  }

  const { character } = characterResult.data
  const { skills } = skillsResult.data

  const screens = {
    stats: <ScreenStats character={character} />,
    skills: <ScreenSkills character={character} skills={skills} />,
    spells: <ScreenSpells character={character} />,
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
        klass={character.klass.name.toLowerCase()}
      />
    </div>
  )
}

export { CharacterSheet as default }
