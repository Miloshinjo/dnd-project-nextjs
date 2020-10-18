import React from 'react'
import { NextPage } from 'next'
import Link from 'next/link'

import styles from './styles.module.css'

const VerifyRequest: NextPage = () => {
  return (
    <div className={styles.container}>
      <img src="/images/logo.svg" alt="LOGO" className={styles.logoImage} />

      <div className={styles.contentContainer}>
        <div>
          <h2 className={styles.headingSecondary}>Check your email</h2>
        </div>
        <p className="text-xs text-center mt-4">
          Sign in email has been sent. Check your inbox to log in. One login
          session lasts for 30 days or until you sign out.
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

export { VerifyRequest as default }
