import React, { Dispatch, SetStateAction, useContext, useState } from 'react'

type CharacterContextTypes = {
  characterId: number
  setCharacterId: Dispatch<SetStateAction<any>>
}

const CharacterContext = React.createContext({} as CharacterContextTypes)

const CharacterProvider: React.FC = ({ children }) => {
  const [characterId, setCharacterId] = useState(null)

  return (
    <CharacterContext.Provider
      value={{
        characterId,
        setCharacterId,
      }}
    >
      {children}
    </CharacterContext.Provider>
  )
}

const useCharacter = (): CharacterContextTypes => useContext(CharacterContext)

export { CharacterProvider as default, useCharacter }
