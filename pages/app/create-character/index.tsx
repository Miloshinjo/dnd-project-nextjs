import { GiQuill } from 'react-icons/gi'

import makeClient from '../../../utils/makeUrqlClient'
import AppLayout from '../../../components/layouts/app-layout'
import CreateCharacterForm from '../../../components/forms/create-character'
import SubHeader from '../../../components/layout/sub-header'
import { Klass } from '../../../generated/graphql'

import styles from './styles.module.css'

const KlassesQuery = `
  query {
    klasses {
      id
      name
    }
  }
`

export const getKlasses = async () => {
  const client = makeClient()

  const result = await client.query(KlassesQuery).toPromise()

  if (!result || result.error) {
    console.log(result.error)
    return []
  }

  return result.data.klasses
}

type Props = {
  klasses: Array<Klass>
}

const CreateCharacter: React.FC<Props> = ({ klasses = [] }) => {
  return (
    <AppLayout title="Character Creation">
      <SubHeader text1="Create your">
        <span className="text-red-600">character</span>!
      </SubHeader>
      <div className={styles.container}>
        <div className={styles.contentContainer}>
          <p className={styles.paragraph}>
            This is basic character creation. Other stats is editable on the
            character screen.
          </p>
          <CreateCharacterForm klasses={klasses} />
        </div>
      </div>
    </AppLayout>
  )
}

export const getStaticProps = async () => {
  const klasses: Array<Klass> = await getKlasses()

  return {
    props: {
      klasses,
    },
  }
}

export { CreateCharacter as default }
