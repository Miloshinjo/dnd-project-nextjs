import { AnimatePresence, motion } from 'framer-motion'
import { IoMdClose } from 'react-icons/io'

import React from 'react'
import { useModal, ModalType } from '../../context/modal'
import UpdateNumberValue from '../modals/update-number-value'
import UpdateSelectValue from '../modals/update-subclass'
import CharacterCreated from '../modals/character-created'
import DeleteCharacter from '../modals/delete-character'
import LearnSpell from '../modals/learn-spell'
import MobileDrawerModal from '../modals/mobile-drawer'
import SpellPageModal from '../modals/spell-page'
import SpellPageStaticModal from '../modals/spell-page-static'
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
      case 'mobileDrawer':
        return <MobileDrawerModal />
      case 'spellPage':
        return (
          <SpellPageModal
            spellId={modal.props.spellId}
            characterId={modal.props.characterId}
            cannotLearn={modal.props.cannotLearn}
          />
        )
      case 'spellPageStatic':
        return (
          <SpellPageStaticModal
            id={modal.props.id}
            name={modal.props.name}
            level={modal.props.level}
            attackSave={modal.props.attackSave}
            castingTime={modal.props.castingTime}
            components={modal.props.components}
            material={modal.props.material}
            concentration={modal.props.concentration}
            damageEffect={modal.props.damageEffect}
            description={modal.props.description}
            duration={modal.props.duration}
            klasses={modal.props.klasses}
            range={modal.props.range}
            ritual={modal.props.ritual}
            school={modal.props.school}
          />
        )
      default:
        return null
    }
  }

  switch (modal?.type) {
    case 'mobileDrawer':
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

    case 'spellPage':
    case 'spellPageStatic':
      return (
        <AnimatePresence exitBeforeEnter onExitComplete={closeModal}>
          {modal && (
            <ClientOnlyPortal selector="#modal">
              <SpellDrawer>
                {renderModal(modal)}
                {children}
              </SpellDrawer>
            </ClientOnlyPortal>
          )}
        </AnimatePresence>
      )

    default:
      return (
        <AnimatePresence exitBeforeEnter onExitComplete={closeModal}>
          {modal && (
            <ClientOnlyPortal selector="#modal">
              <ComeInTop>
                {renderModal(modal)}
                {children}
              </ComeInTop>
            </ClientOnlyPortal>
          )}
        </AnimatePresence>
      )
  }
}

export { Modal as default }

const backdropVariants = { visible: { opacity: 1 }, hidden: { opacity: 0 } }

const topModalVariants = {
  hidden: { y: '-200px', opacity: 0, transition: { duration: 0.4 } },
  visible: {
    y: 0,
    opacity: 1,
    transition: { duration: 0.3 },
  },
}

const ComeInTop: React.FC = ({ children }) => {
  return (
    <motion.div
      className={styles.backdrop}
      variants={backdropVariants}
      initial="hidden"
      animate="visible"
      exit="hidden"
    >
      <motion.div className={styles.modal} variants={topModalVariants}>
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

const ComeInDrawer: React.FC = ({ children }) => {
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
      </motion.div>
    </motion.div>
  )
}

const drawerSpellModalVariants = {
  hidden: { x: '100vw', opacity: 0 },
  visible: {
    x: 0,
    opacity: 1,
    transition: { delay: 0.1, type: 'tween' },
  },
}

const SpellDrawer: React.FC = ({ children }) => {
  return (
    <motion.div
      className={styles.drawerBackdrop}
      variants={backdropVariants}
      initial="hidden"
      animate="visible"
      exit="hidden"
    >
      <motion.div
        className={styles.modalSpellDrawer}
        variants={drawerSpellModalVariants}
      >
        {children}
      </motion.div>
    </motion.div>
  )
}
