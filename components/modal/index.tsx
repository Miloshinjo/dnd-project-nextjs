import { AnimatePresence, motion } from 'framer-motion'
import { BsArrowReturnLeft } from 'react-icons/bs'

import { useModal, ModalType } from '../../context/modal'
import UpdateNumberValue from '../modals/update-number-value'
import UpdateSelectValue from '../modals/update-subclass'
import CharacterCreated from '../modals/character-created'
import DeleteCharacter from '../modals/delete-character'
import LearnSpell from '../modals/learn-spell'
import SpellModal from '../modals/spell-modal'
import ClientOnlyPortal from '../../utils/clientOnlyPortal'

import styles from './styles.module.css'

const Modal: React.FC = ({ children }) => {
  const { modal, closeModal } = useModal()

  const renderModal = (modal: ModalType) => {
    if (!modal) return null

    switch (modal.type) {
      case 'number':
        return (
          <UpdateNumberValue
            originalValue={modal.props.originalValue}
            characterId={modal.props.characterId}
            title={modal.props.title}
            type={modal.props.type}
            mutation={modal.props.mutation}
          />
        )
      case 'addSubclass':
        return (
          <UpdateSelectValue
            originalValue={modal.props.originalValue}
            characterId={modal.props.characterId}
            klassName={modal.props.klassName}
          />
        )
      case 'learnSpell':
        return <LearnSpell spellId={modal.props.spellId} />
      case 'characterCreated':
        return (
          <CharacterCreated
            characterId={modal.props.characterId}
            name={modal.props.name}
            race={modal.props.race}
            klass={modal.props.klass}
          />
        )
      case 'deleteCharacter':
        return (
          <DeleteCharacter
            characterId={modal.props.characterId}
            name={modal.props.name}
          />
        )
      case 'spell':
        return (
          <SpellModal
            spellId={modal.props.spellId}
            spellName={modal.props.spellName}
          />
        )
      default:
        return null
    }
  }

  switch (modal?.type) {
    case 'spell':
      return (
        <AnimatePresence exitBeforeEnter onExitComplete={closeModal}>
          {modal && (
            <ClientOnlyPortal selector="#modal">
              <ComeInDrawer>
                {renderModal(modal)}
                {children}
              </ComeInDrawer>
            </ClientOnlyPortal>
          )}
        </AnimatePresence>
      )

    default:
      return (
        <AnimatePresence exitBeforeEnter onExitComplete={closeModal}>
          {modal && (
            <ClientOnlyPortal selector="#modal">
              <ComeInRight>
                {renderModal(modal)}
                {children}
              </ComeInRight>
            </ClientOnlyPortal>
          )}
        </AnimatePresence>
      )
  }
}

export { Modal as default }

const backdropVariants = { visible: { opacity: 1 }, hidden: { opacity: 0 } }

const rightModalVariants = {
  hidden: { x: '100vw', opacity: 0 },
  visible: {
    x: 0,
    opacity: 1,
    transition: { delay: 0.1 },
  },
}

const ComeInRight: React.FC = ({ children }) => {
  return (
    <motion.div
      className={styles.backdrop}
      variants={backdropVariants}
      initial="hidden"
      animate="visible"
      exit="hidden"
    >
      <motion.div className={styles.modal} variants={rightModalVariants}>
        {children}
      </motion.div>
    </motion.div>
  )
}

const drawerModalVariants = {
  hidden: { x: '-100vw', opacity: 0 },
  visible: {
    x: 0,
    opacity: 1,
    transition: { delay: 0.2, type: 'tween' },
  },
}

const drawerCloseButtonVariants = {
  hidden: { x: '-150vw', opacity: 0 },
  visible: {
    x: '38vw',
    opacity: 1,
    transition: { delay: 0.2, type: 'tween' },
  },
}

const ComeInDrawer: React.FC = ({ children }) => {
  const { closeModal } = useModal()

  return (
    <motion.div
      className={styles.drawerBackdrop}
      variants={backdropVariants}
      initial="hidden"
      animate="visible"
      exit="hidden"
    >
      <motion.div className={styles.modalDrawer} variants={drawerModalVariants}>
        {children}
        <motion.button
          type="button"
          className={styles.drawerCloseButton}
          onClick={closeModal}
          variants={drawerCloseButtonVariants}
        >
          <BsArrowReturnLeft size={30} />
        </motion.button>
      </motion.div>
    </motion.div>
  )
}
