import { useMemo } from 'react'

import { CharacterQuery, SkillsQuery } from '../../../../generated/graphql'

import useGetActiveCharacterScreen from '../../../../hooks/useGetActiveCharacterScreen'

import Nav from '../common/nav'

import ScreenInventory from '../mobile/screen-inventory'
import ScreenKlass from '../mobile/screen-klass'
import ScreenSettings from '../mobile/screen-settings'
import ScreenSpells from '../mobile/screen-spells'

import ScreenStats from './screen-stats'

type Props = {
  character: CharacterQuery['character']
  skills: SkillsQuery['skills']
}

const SheetDesktop: React.FC<Props> = ({ character, skills }) => {
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
    <div>
      <Nav
        setActiveKeyAndStore={setActiveCharacterScreenAndStore}
        activeKey={activeCharacterScreen}
        isSpellcaster={
          !!character.subclass?.spellCastingModifier ||
          !!character.klass.spellCastingModifier
        }
        klassName={character.klass.name.toLowerCase()}
      />
      <div>{screens[activeCharacterScreen]}</div>
    </div>
  )
}

export { SheetDesktop as default }
