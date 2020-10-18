import React from 'react'
import { NextPage } from 'next'
import Link from 'next/link'

import styles from './styles.module.css'

const AuthError: NextPage = () => {
  return (
    <div className={styles.container}>
      <img src="/images/logo.svg" alt="LOGO" className={styles.logoImage} />

      <div className={styles.contentContainer}>
        <div>
          <h2 className={styles.headingSecondary}>Authentication Error</h2>
        </div>
        <p className="text-xs text-center mt-4">
          An error happened during authentication. Check if you have used
          another way of signing in.
        </p>
        <Link href="/">
          <a className="underline text-center text-primary-600 mt-4 block">
            Back to home
          </a>
        </Link>
      </div>
    </div>
  )
}

export { AuthError as default }
