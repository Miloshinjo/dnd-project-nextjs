import { useEffect } from 'react'
import Head from 'next/head'
import { signIn, useSession } from 'next-auth/client'
import { useRouter } from 'next/router'
import ButtonPrimary from '../components/buttons/primary'
import LoadingPage from '../components/layout/loading-page'

import styles from './styles.module.css'

const Home = () => {
  const [session, loading] = useSession()
  const router = useRouter()

  useEffect(() => {
    if (session) {
      router.push('/app')
    }
  }, [session, loading])

  if (loading) return <LoadingPage />

  return (
    <>
      <Head>
        <meta
          name="description"
          content="A dungeons and dragons note taking app"
        />
        <meta
          name="viewport"
          content="width=device-width,initial-scale=1,minimum-scale=1,maximum-scale=1,user-scalable=no"
        />
        <meta name="keywords" content="dungeons and dragons character sheet" />
        <title>Home</title>
      </Head>
      <div className={styles.container}>
        <div className={styles.contentContainer}>
          <img src="/images/logo.svg" alt="LOGO" className={styles.logoImage} />
          <p className={styles.paragraph}>
            App that helps you manage and save your 5th edition dungeons and
            dragons characters. Sign in to continue. <br />
          </p>
          <ButtonPrimary
            additionalStyles="mt-6"
            onClick={() =>
              signIn(null, {
                callbackUrl:
                  process.env.NODE_ENV === 'production'
                    ? 'https://simulacrum.rocks/app'
                    : 'http://localhost:3000/app',
              })
            }
          >
            Sign In
          </ButtonPrimary>
        </div>
      </div>
    </>
  )
}

export { Home as default }
