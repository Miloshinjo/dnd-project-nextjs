import { useTheme } from 'next-themes'
import { GiNightSky, GiSun } from 'react-icons/gi'

import styles from './styles.module.css'

const ThemeSwitchButton: React.FC = () => {
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
      className={styles.button}
      type="button"
    >
      {theme === 'light' ? (
        <span>
          <GiNightSky size={20} />
          Night Mode
        </span>
      ) : (
        <span>
          <GiSun size={20} />
          Day Mode
        </span>
      )}
    </button>
  )
}

export { ThemeSwitchButton as default }
