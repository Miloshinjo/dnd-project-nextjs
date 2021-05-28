import { useMemo } from 'react'

import { CharacterQuery, SkillsQuery } from '../../../../generated/graphql'

import useGetActiveCharacterScreen from '../../../../hooks/useGetActiveCharacterScreen'

import Nav from '../common/nav'

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
  const [
    activeCharacterScreen,
    setActiveCharacterScreenAndStore,
  ] = useGetActiveCharacterScreen(character.id)

  const screens = useMemo(
    () => ({
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
    }),
    [character, skills],
  )

  return (
    <>
      <div className={styles.screensContainer}>
        {screens[activeCharacterScreen]}
      </div>
      <Nav
        activeKey={activeCharacterScreen}
        setActiveKeyAndStore={setActiveCharacterScreenAndStore}
        isSpellcaster={
          !!character.subclass?.spellCastingModifier ||
          !!character.klass.spellCastingModifier
        }
        klassName={character.klass.name.toLowerCase()}
      />
    </>
  )
}

export { SheetMobile as default }
