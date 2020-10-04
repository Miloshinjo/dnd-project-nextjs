import { useSession } from 'next-auth/client'
import { useRouter } from 'next/router'
import { useEffect } from 'react'

import AppLayout from '../../../components/layouts/app-layout'
import CreateCharacterForm from '../../../components/forms/create-character'
import SubHeader from '../../../components/layout/sub-header'
import { Klass } from '../../../generated/graphql'
import { client } from '../../../pages/_app'
import LoadingPage from '../../../components/layout/loading-page'

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

const CreateCharacter: React.FC<Props> = ({ klasses }) => {
  const [session, loading] = useSession()
  const router = useRouter()

  useEffect(() => {
    if (!session && !loading) {
      router.push('/')
    }
  }, [session, loading])

  if (loading) return <LoadingPage />

  if (!loading && !session) return <p>Logging you out...</p>

  if (!klasses) {
    return null
  }

  return (
    <AppLayout title="Character Creation">
      <SubHeader text1="Create your">
        <span className="text-primary-600">character</span>!
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
