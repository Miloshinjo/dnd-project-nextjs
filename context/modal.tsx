import { useRouter } from 'next/router'
import React, {
  useEffect,
  Dispatch,
  SetStateAction,
  useState,
  useContext,
} from 'react'

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

  /**
   * Closes the modal
   */
  const closeModal = () => {
    if (modal && router.query.modal) {
      router.back()
    }
  }

  // /**
  //  * Add relevant styles to prevent scrolling behind modal
  //  */
  // useEffect(() => {
  //   if (modal && router.query.modal) {
  //     document.body.style.overflow = 'hidden'
  //     document.body.style.height = '100vh'
  //   } else {
  //     document.body.style.overflow = 'visible'
  //     document.body.style.height = 'auto'
  //   }
  // }, [router.query.modal])

  /**
   * Close the modal when close modal route changes
   */
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
