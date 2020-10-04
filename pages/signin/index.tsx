import React from 'react'
import { csrfToken, providers } from 'next-auth/client'
import { FaGithub, FaGoogle, FaDiscord } from 'react-icons/fa'

import ButtonPrimary from '../../components/buttons/primary'
import ButtonOauth from '../../components/buttons/oauth'
import styles from './styles.module.css'

export default function SignIn({ csrfToken, providers }) {
  return (
    <div className={styles.container}>
      <img src="/images/logo.svg" alt="LOGO" className={styles.logoImage} />

      <div className={styles.contentContainer}>
        <div>
          <h2 className={styles.headingSecondary}>Sign in to your account</h2>
        </div>
        {/* <form
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
          <ButtonPrimary type="submit" additionalStyles="mt-2">
            Sign in with email
          </ButtonPrimary>
        </form>

        <div className={styles.divider}>
          <span className={styles.dividerLine}></span>
          <span className={styles.dividerText}>Or</span>
          <span className={styles.dividerLine}></span>
        </div> */}

        <div className="flex justify-center gap-x-4">
          {/* <ButtonOauth
            oauthClientId={providers.google.id}
            icon={<FaGoogle color="#3182CE" size={20} />}
            oauthClientTitle={'Google'}
          /> */}
          <ButtonOauth
            oauthClientId={providers.discord.id}
            icon={<FaDiscord color="#3182CE" size={20} />}
            oauthClientTitle={'Discord'}
          />
          {/* <ButtonOauth
            oauthClientId={providers.github.id}
            icon={<FaGithub color="#3182CE" size={20} />}
            oauthClientTitle={'Github'}
          /> */}
        </div>
        <p className="text-xs text-center mt-8">
          At the moment, we only support sign in with Discord. Others are in the
          works.
        </p>
      </div>
    </div>
  )
}

SignIn.getInitialProps = async (context) => {
  return {
    csrfToken: await csrfToken(context),
    providers: await (providers as any)(context),
  }
}
