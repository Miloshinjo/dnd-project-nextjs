import React, {
  useEffect,
  Dispatch,
  SetStateAction,
  useState,
  useContext,
} from 'react'
import { useRouter } from 'next/router'

import Modal from '../components/modal'
import { ModalTypes } from '../models/modal'

export type ModalType = {
  type: ModalTypes
  props: Record<string, any>
} | null

type ModalContextTypes = {
  modal: ModalType
  openModal: Dispatch<SetStateAction<ModalType>>
  closeModal: () => void
}

const ModalContext = React.createContext({} as ModalContextTypes)

const ModalProvider: React.FC = ({ children }) => {
  const [modal, openModal] = useState<ModalType>(null)
  const router = useRouter()

  const closeModal = () => {
    if (modal && router.query.modal) {
      router.back()
    }
  }

  useEffect(() => {
    if (!router.query.modal && modal) {
      openModal(null)
    }

    if (router.query.modal && !modal) {
      router.back()
    }
  }, [router.query.modal])

  return (
    <ModalContext.Provider
      value={{
        modal,
        openModal: (args) => {
          router.push({
            pathname: router.pathname,
            query: { ...router.query, modal: 'true' },
          })
          openModal(args)
        },
        closeModal,
      }}
    >
      <Modal />
      {children}
    </ModalContext.Provider>
  )
}

const useModal = (): ModalContextTypes => useContext(ModalContext)

export { ModalProvider as default, useModal }
