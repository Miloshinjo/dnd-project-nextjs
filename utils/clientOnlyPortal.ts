import { useRef, useEffect, useState } from 'react'
import { createPortal } from 'react-dom'

type Props = {
  selector: any
}

const ClientOnlyPortal: React.FC<Props> = ({ children, selector }) => {
  const ref = useRef() as React.MutableRefObject<HTMLElement>
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    ref.current = document.querySelector(selector)
    setMounted(true)
  }, [selector])

  return mounted ? createPortal(children, ref.current) : null
}

export { ClientOnlyPortal as default }
