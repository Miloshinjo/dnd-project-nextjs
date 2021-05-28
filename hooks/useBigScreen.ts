import { useMediaQuery } from 'react-responsive'

const useBigScreen = (): boolean =>
  useMediaQuery({ query: '(min-device-width: 768px)' })

export { useBigScreen as default }
