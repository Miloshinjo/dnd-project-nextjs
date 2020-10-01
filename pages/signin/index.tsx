import React from 'react'
import { csrfToken } from 'next-auth/client'

import SubmitButton from '../../components/form/submit-button'
import styles from './styles.module.css'

export default function SignIn({ csrfToken }) {
  return (
    <div className={styles.container}>
      <h1 className={styles.headingPrimary}>Simulacrum</h1>
      <div className={styles.contentContainer}>
        <div>
          <h2 className={styles.headingSecondary}>Sign in to your account</h2>
        </div>
        <form
          method="post"
          action="/api/auth/signin/email"
          className={styles.emailForm}
        >
          <input name="csrfToken" type="hidden" defaultValue={csrfToken} />
          <label className={styles.emailLabel}>
            Email address
            <input
              type="text"
              id="email"
              name="email"
              className={styles.emailInput}
            />
          </label>
          <SubmitButton text="Sign in with email" loading={false} />
        </form>
      </div>
    </div>
  )
}

SignIn.getInitialProps = async (context) => {
  return {
    csrfToken: await csrfToken(context),
  }
}
