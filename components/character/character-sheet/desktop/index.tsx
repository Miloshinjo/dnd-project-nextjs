import { CharacterQuery, SkillsQuery } from '../../../../generated/graphql'

import AbilityScores from './../common/ability-scores'

type Props = {
  character: CharacterQuery['character']
  skills: SkillsQuery['skills']
}

const SheetDesktop: React.FC<Props> = ({ character, skills }) => {
  return (
    <div className="p-4 flex">
      <AbilityScores character={character} />
    </div>
  )
}

export { SheetDesktop as default }
