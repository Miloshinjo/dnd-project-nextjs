import { useTheme } from 'next-themes'
import { GiNightSky, GiSun } from 'react-icons/gi'

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
          <GiNightSky size={20} className="mr-2" />
          <span className="md:hidden">Night Mode</span>
        </span>
      ) : (
        <span>
          <GiSun size={20} className="mr-2" />
          <span className="md:hidden">Day Mode</span>
        </span>
      )}
    </button>
  )
}

export { ThemeSwitchButton as default }
