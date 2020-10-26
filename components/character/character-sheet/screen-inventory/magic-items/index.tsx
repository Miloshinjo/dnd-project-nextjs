import OpenModalButton from '../../../../buttons/open-modal-button'

import { GiMagicLamp } from 'react-icons/gi'

import styles from './styles.module.css'

const MagicItems = ({ magicItems, characterId }) => {
  if (magicItems.length === 0) {
    return (
      <div className={styles.container}>
        <h3 className={`${styles.heading} statSectionHeading`}>Magic Items</h3>
        <GiMagicLamp size={55} />
        <p className={styles.text}>
          Your character does not have any magic items. Click below to add some
        </p>
        <OpenModalButton
          className={styles.button}
          type="createMagicItem"
          props={{ characterId }}
        >
          Add magic item
        </OpenModalButton>
      </div>
    )
  }

  return <div className={styles.container}>MagicItems</div>
}

export { MagicItems as default }
