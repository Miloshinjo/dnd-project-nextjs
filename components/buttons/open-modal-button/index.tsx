import { useModal } from '../../../context/modal'
import { ModalTypes } from '../../../models/modal'

type Props = {
  className: string
  type: ModalTypes
  props: any
}

const OpenModalButton: React.FC<Props> = ({
  children,
  className,
  type,
  props,
}) => {
  const { openModal } = useModal()

  const requestOpenModal = () => {
    openModal({ type, props })
  }

  return (
    <button type="button" className={className} onClick={requestOpenModal}>
      {children}
    </button>
  )
}

export { OpenModalButton as default }
