import { NextPage } from 'next'
import { GiQuillInk } from 'react-icons/gi'

import { getSpells } from '../index'
import { client } from '../../../pages/_app'
import { Spell } from '../../../generated/graphql'
import AppLayout from '../../../components/layouts/app-layout'
import { useModal } from '../../../context/modal'
import SpellDescription from '../../../components/spell/description'
import SpellInfo from '../../../components/spell/info'
import SpellMaterial from '../../../components/spell/material'
import SpellKlasses from '../../../components/spell/klasses'
import SpellConcentrationRitual from '../../../components/spell/concentration-ritual'

import styles from './styles.module.css'

const SpellQuery = `
  query Spell ($id: ID!) {
    spell(id: $id) {
      id
      name
      level
      description
      klasses
      concentration
      duration
      castingTime
      range
      components
      school
      attackSave
      damageEffect
      material
    }
  }
`

type Props = {
  spell: Spell
}

type LearnSpellButtonProps = {
  spellId: Spell['id']
}

const LearnSpellButton: React.FC<LearnSpellButtonProps> = ({ spellId }) => {
  const { openModal } = useModal()

  return (
    <button
      type="button"
      onClick={() =>
        openModal({
          type: 'learnSpell',
          props: {
            spellId,
          },
        })
      }
      className={styles.learnSpellsButton}
    >
      <span className="mr-2 flex text-xs whitespace-no-wrap">Learn Spell</span>
      <GiQuillInk size={25} />
    </button>
  )
}

const SpellPage: NextPage<Props> = ({ spell }) => {
  if (!spell) {
    return null
  }

  return (
    <AppLayout title={spell.name}>
      <article className={styles.container}>
        <div className={styles.header}>
          <div>
            <h2 className={styles.spellName}>{spell.name}</h2>
            <h3 className={styles.spellSchool}>{spell.school}</h3>
          </div>
          <div>
            <LearnSpellButton spellId={spell.id} />
          </div>
        </div>
        <SpellInfo
          attackSave={spell.attackSave}
          castingTime={spell.castingTime}
          components={spell.components}
          damageEffect={spell.damageEffect}
          duration={spell.duration}
          range={spell.range}
        />
        <SpellConcentrationRitual
          concentration={spell.concentration}
          ritual={spell.ritual}
        />
        <SpellDescription description={spell.description} />
        <SpellMaterial material={spell.material} />
        <SpellKlasses klasses={spell.klasses} />
      </article>
    </AppLayout>
  )
}

export const getSpell = async (id: Spell['id']) => {
  const result = await client.query(SpellQuery, { id }).toPromise()

  if (!result || result.error) {
    console.log(result.error)
    return null
  }

  return result.data.spell
}

export const getStaticProps = async (ctx) => {
  const { spellId } = ctx.params
  const spell: Spell = await getSpell(spellId)

  return {
    revalidate: 1,
    props: {
      spell,
    },
  }
}

export const getStaticPaths = async () => {
  const spells = await getSpells()

  return {
    paths: spells.map(({ id }) => ({
      params: { spellId: `${id}` },
    })),
    fallback: true,
  }
}

export { SpellPage as default }
