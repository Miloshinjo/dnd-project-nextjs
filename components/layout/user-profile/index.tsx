import { useState } from 'react'

import useBigScreen from '../../../hooks/useBigScreen'

import { useSession } from '../../../lib/next-auth/client'

import styles from './styles.module.css'

const UserProfile: React.FC = () => {
  const [session] = useSession()
  const isBigScreen = useBigScreen()

  const email = session?.user?.email
  const name = session?.user?.name
  const image = session?.user?.image

  const [src, setSrc] = useState(image)

  const removeSrc = () => {
    setSrc(null)
  }

  if (!session?.user) return null

  if (isBigScreen) {
    return (
      <button className={styles.container}>
        <div className={styles.avatarContainer}>
          {src ? (
            <img
              src={src}
              onError={removeSrc}
              alt="profile image"
              className={styles.avatarImage}
            />
          ) : (
            <div className={styles.emptyAvatar}>
              {(name ? name : email).substring(0, 2)}
            </div>
          )}
        </div>
        <div className={styles.userInfoContainer}>
          <div className={styles.username}>{name}</div>
          <div className={styles.email}>{email}</div>
        </div>
      </button>
    )
  }

  return (
    <div className={styles.container}>
      <div className={styles.avatarContainer}>
        {src ? (
          <img
            src={src}
            onError={removeSrc}
            alt="profile image"
            className={styles.avatarImage}
          />
        ) : (
          <div className={styles.emptyAvatar}>
            {(name ? name : email).substring(0, 2)}
          </div>
        )}
      </div>
      <div className={styles.userInfoContainer}>
        <div className={styles.username}>{name}</div>
        <div className={styles.email}>{email}</div>
      </div>
    </div>
  )
}

export { UserProfile as default }
