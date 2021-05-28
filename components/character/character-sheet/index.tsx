import {
  Character,
  useCharacterQuery,
  useSkillsQuery,
} from '../../../generated/graphql'
import useBigScreen from '../../../hooks/useBigScreen'

import TextLoader from '../../layout/text-loader'

import CharacterHeader from './common/header'
import SheetDesktop from './desktop'
import SheetMobile from './mobile'

import styles from './styles.module.css'

type Props = {
  id: Character['id']
}

const CharacterSheet: React.FC<Props> = ({ id }) => {
  const [characterResult] = useCharacterQuery({ variables: { id } })
  const [skillsResult] = useSkillsQuery()
  const isBigScreen = useBigScreen()

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

  return (
    <div className={styles.container}>
      <CharacterHeader character={character} />
      {isBigScreen ? (
        <SheetDesktop character={character} skills={skills} />
      ) : (
        <SheetMobile character={character} skills={skills} />
      )}
    </div>
  )
}

export { CharacterSheet as default }
