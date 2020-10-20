import { subclassTitle } from '../../../../../utils/character'
import { useModal } from '../../../../../context/modal'

import styles from './styles.module.css'

type Props = {
  character: any
}

const SubclassSection: React.FC<Props> = ({ character }) => {
  const { openModal } = useModal()

  return (
    <div className={styles.container}>
      <h3 className="font-medium mb-1">
        {subclassTitle[character.klass.name]}
      </h3>
      {character?.subclass ? (
        <button
          type="button"
          className="font-bold"
          onClick={() => {
            openModal({
              type: 'addSubclass',
              props: {
                originalValue: {
                  id: character.subclass.id,
                  label: character.subclass.name,
                },
                characterId: character.id,
                klassName: character.klass.name,
              },
            })
          }}
        >
          {character.subclass.name}
        </button>
      ) : (
        <>
          <p className="mb-4 text-sm italic">
            Usually picked at levels 2 or 3.
          </p>
          <button
            type="button"
            style={{
              borderColor: `var(--color-${character.klass.name.toLowerCase()})`,
            }}
            className={styles.addButton}
            onClick={() => {
              openModal({
                type: 'addSubclass',
                props: {
                  originalValue: {
                    id: character?.subclass?.id,
                    label: character?.subclass?.name,
                  },
                  characterId: character.id,
                  klassName: character.klass.name,
                },
              })
            }}
          >
            Pick {subclassTitle[character.klass.name]}
          </button>
        </>
      )}
    </div>
  )
}

export { SubclassSection as default }
