import { CharacterQuery } from '../../../../generated/graphql'

import AbilityScores from './../common/ability-scores'

type Props = {
  character: CharacterQuery['character']
}

const SheetDesktop: React.FC<Props> = ({ character }) => {
  return (
    <div className="p-4 flex">
      <AbilityScores character={character} />
    </div>
  )
}

export { SheetDesktop as default }
