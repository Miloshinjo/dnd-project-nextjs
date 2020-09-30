import { useEffect } from 'react'
import Head from 'next/head'
import { signIn, useSession } from 'next-auth/client'
import { useRouter } from 'next/router'

import styles from './styles.module.css'

const Home = () => {
  const [session, loading] = useSession()
  const router = useRouter()

  useEffect(() => {
    if (session) {
      router.push('/app')
    }
  }, [session, loading])

  if (loading) return null

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
          <h1 className={styles.title}>
            Welcome to <br />{' '}
            <span className={styles.titleMain}>Session Assistant</span>{' '}
          </h1>
          <p className={styles.paragraph}>
            Helps you manage and save your 5th edition dungeons and dragons
            characters. Sign in to continue. <br />
          </p>
          <button
            className={styles.loginButton}
            type="button"
            onClick={() => signIn()}
          >
            Sign In
          </button>
        </div>
      </div>
    </>
  )
}

export { Home as default }
