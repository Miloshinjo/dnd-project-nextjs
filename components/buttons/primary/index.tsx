import { MouseEvent } from 'react'

import TextLoader from '../../layout/text-loader'

import styles from './styles.module.css'

type Props = {
  onClick?: (event: MouseEvent<HTMLButtonElement>) => void
  type?: 'button' | 'submit'
  additionalStyles?: string
  loading?: boolean
  loadingText?: string
}

const ButtonPrimary: React.FC<Props> = ({
  children,
  onClick = null,
  type = 'button',
  additionalStyles = '',
  loading = false,
  loadingText = '',
}) => {
  return (
    <button
      type={type}
      className={`${styles.button} ${additionalStyles}`}
      onClick={onClick}
      disabled={loading}
    >
      {loading && loadingText ? <TextLoader text={loadingText} /> : children}
    </button>
  )
}

export { ButtonPrimary as default }
