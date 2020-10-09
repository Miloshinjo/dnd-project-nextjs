import { Character } from '../../../../../generated/graphql'

import { useModal } from '../../../../../context/modal'

import styles from './styles.module.css'

type Props = {
  characterId: Character['id']
  spells: Character['spells']
  numberOfSpellsPrepared: number
}

const SpellsPrepared: React.FC<Props> = ({
  characterId,
  spells,
  numberOfSpellsPrepared,
}) => {
  const { openModal } = useModal()

  return (
    <div className={styles.container}>
      <div className="p-2">
        <div className="flex items-center px-4 justify-between mb-2">
          <h4 className="text-center text-sm font-medium text-gray-600">
            List of prepared spells
            <span className="text-xs ml-1 text-gray-500">
              ({spells.length} of {numberOfSpellsPrepared})
            </span>
          </h4>
        </div>
        <div className="px-4 flex flex-wrap">
          {spells.length ? (
            spells.map((spell) => {
              return (
                <div className="flex items-center mr-2 mb-2" key={spell.id}>
                  <button
                    type="button"
                    className="px-2 text-sm bg-white shadow-inner border"
                    onClick={() =>
                      openModal({
                        type: 'spellPage',
                        props: {
                          spellId: spell.id,
                          characterId,
                        },
                      })
                    }
                  >
                    {spell.name}
                  </button>
                </div>
              )
            })
          ) : (
            <div className="text-sm italic">
              No prepared spells. Click on a spell to prepare it.
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export { SpellsPrepared as default }
