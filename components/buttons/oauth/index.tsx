import { MouseEvent } from 'react'
import { signIn } from 'next-auth/client'

import styles from './styles.module.css'

type Props = {
  oauthClientId: string
  oauthClientTitle: string
  icon: JSX.Element
}

const ButtonOauth: React.FC<Props> = ({
  oauthClientId,
  icon,
  oauthClientTitle,
}) => {
  return (
    <button
      onClick={() =>
        signIn(oauthClientId, {
          callbackUrl:
            process.env.NODE_ENV === 'production'
              ? 'https://simulacrum.rocks/app'
              : 'http://localhost:3000/app',
        })
      }
      className={styles.button}
      type="button"
    >
      {icon}
      <span className={styles.title}>{oauthClientTitle}</span>
    </button>
  )
}

export { ButtonOauth as default }
