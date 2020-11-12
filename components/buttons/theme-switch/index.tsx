import { useTheme } from 'next-themes'
import { GiMoonOrbit, GiSun } from 'react-icons/gi'

import styles from './styles.module.css'

type Props = {
  color?: 'alternate' | 'same'
}

const ThemeSwitchButton: React.FC<Props> = ({ color = 'alternate' }) => {
  const { theme, setTheme } = useTheme()

  return (
    <button
      onClick={() => {
        if (theme === 'light') {
          setTheme('dark')
        } else {
          setTheme('light')
        }
      }}
      className={`${styles.button} ${color === 'same' && styles.sameColor}`}
      type="button"
    >
      {theme === 'light' ? (
        <span>
          <GiMoonOrbit size={20} className="mr-2" />
          <span>Night Mode</span>
        </span>
      ) : (
        <span>
          <GiSun size={20} className="mr-2" />
          <span>Day Mode</span>
        </span>
      )}
    </button>
  )
}

export { ThemeSwitchButton as default }
