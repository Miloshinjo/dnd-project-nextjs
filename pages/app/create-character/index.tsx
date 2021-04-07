import { useRouter } from 'next/router'
import { useEffect } from 'react'

import CreateCharacterForm from '../../../components/forms/create-character'
import LoadingPage from '../../../components/layout/loading-page'
import SubHeader from '../../../components/layout/sub-header'
import AppLayout from '../../../components/layouts/app-layout'
import { Klass } from '../../../generated/graphql'
import { useSession } from '../../../lib/next-auth/client'
import { client } from '../../../pages/_app'

import styles from './styles.module.css'

const KlassesQuery = `
  query {
    klasses {
      id
      name
    }
  }
`

export const getKlasses = async (): Promise<Array<Klass>> => {
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

  if (!klasses) {
    return null
  }

  if (loading) return <LoadingPage />

  if (!loading && !session) return <p>Logging you out...</p>

  return (
    <AppLayout title="Character Creation">
      <SubHeader text1="Create your">
        <span className="text-primary-600">character</span>!
      </SubHeader>
      <div className={styles.container}>
        <div className={styles.contentContainer}>
          <p className={styles.paragraph}>Create your character</p>
          <CreateCharacterForm klasses={klasses} />
        </div>
      </div>
    </AppLayout>
  )
}

export const getStaticProps = async (): Promise<{ props: Props }> => {
  const klasses: Array<Klass> = await getKlasses()

  return {
    props: {
      klasses,
    },
  }
}

export { CreateCharacter as default }
