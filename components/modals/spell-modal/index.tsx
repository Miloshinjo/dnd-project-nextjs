import { Spell, useSpellQuery } from '../../../generated/graphql'

import Loader from '../../layout/loader'
import SpellDescription from '../../../components/spell/description'
import SpellInfo from '../../../components/spell/info'
import SpellConcentrationRitual from '../../../components/spell/concentration-ritual'
import SpellMaterial from '../../../components/spell/material'
import SpellKlasses from '../../../components/spell/klasses'

import styles from './styles.module.css'

type Props = {
  spellId: Spell['id']
  spellName: Spell['name']
}

const SpellModal: React.FC<Props> = ({ spellId }) => {
  const [result] = useSpellQuery({
    variables: { id: `${spellId}` },
  })

  if (result.fetching) {
    return (
      <div className="m-8">
        <Loader />
      </div>
    )
  }

  if (result.error) {
    console.log(result.error)
    return <div>{result?.error?.message || 'Unknown error occurred'}</div>
  }

  const { spell } = result.data
  return (
    <div className={styles.container}>
      <div className="flex flex-col p-4 items-start">
        <h2 className={styles.spellName}>{spell.name}</h2>
        <h3 className={styles.spellSchool}>{spell.school}</h3>
        <SpellConcentrationRitual
          concentration={spell.concentration}
          ritual={spell.ritual}
        />
        <SpellInfo
          attackSave={spell.attackSave}
          castingTime={spell.castingTime}
          components={spell.components}
          damageEffect={spell.damageEffect}
          duration={spell.duration}
          range={spell.range}
        />
        <SpellDescription description={spell.description} />
        <SpellMaterial material={spell.material} />
        <SpellKlasses klasses={spell.klasses} />
      </div>
    </div>
  )
}

export { SpellModal as default }
