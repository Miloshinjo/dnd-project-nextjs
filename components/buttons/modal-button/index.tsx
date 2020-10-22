type Props = {
  className: string
}

const ModalButton: React.FC<Props> = ({ children, className }) => {
  return (
    <button type="button" className={className}>
      {children}
    </button>
  )
}

export { ModalButton as default }
