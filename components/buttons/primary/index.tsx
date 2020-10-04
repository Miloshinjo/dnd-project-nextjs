import { MouseEvent } from 'react'

import styles from './styles.module.css'

type Props = {
  onClick?: (event: MouseEvent<HTMLButtonElement>) => void
  type?: 'button' | 'submit'
  additionalStyles?: string
}

const ButtonPrimary: React.FC<Props> = ({
  children,
  onClick = null,
  type = 'button',
  additionalStyles = '',
}) => {
  return (
    <button
      type={type}
      className={`${styles.button} ${additionalStyles}`}
      onClick={onClick}
    >
      {children}
    </button>
  )
}

export { ButtonPrimary as default }
