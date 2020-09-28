import Link from 'next/link'
import styles from './styles.module.css'

type Props = {
  messagePartOne: string
  messagePartTwo: string
  messageLink: string
  heading: string
}

const AuthLayout: React.FC<Props> = ({
  children,
  messagePartOne,
  messagePartTwo,
  messageLink,
  heading,
}) => {
  return (
    <div className={styles.container}>
      <div className={styles.contentContainer}>
        <div>
          <img className={styles.logo} src="/images/logo.png" alt="logo" />
          <h2 className={styles.heading}>{heading}</h2>
          <p className={styles.message}>
            or{' '}
            <Link href={messageLink}>
              <a className={styles.link}>{messagePartOne}</a>
            </Link>{' '}
            {messagePartTwo}
          </p>
        </div>
        {children}
      </div>
    </div>
  )
}

export { AuthLayout as default }
