import React, { Dispatch, SetStateAction, useState, useContext } from 'react'

import Modal from '../components/modal'

export type ModalType = {
  type:
    | 'number'
    | 'learnSpell'
    | 'spell'
    | 'characterCreated'
    | 'deleteCharacter'
    | 'addSubclass'
    | 'mobileDrawer'
    | 'spellPage'
    | 'spellPageStatic'
    | null
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

  const closeModal = () => {
    openModal(null)
  }

  return (
    <ModalContext.Provider value={{ modal, openModal, closeModal }}>
      <Modal />
      {children}
    </ModalContext.Provider>
  )
}

const useModal = () => useContext(ModalContext)

export { ModalProvider as default, useModal }
