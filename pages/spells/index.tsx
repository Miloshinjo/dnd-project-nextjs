import { client } from '../_app'
import { NextPage } from 'next'

import FiltersProvider from '../../context/filters'

import { Spell } from '../../generated/graphql'

import AppLayout from '../../components/layouts/app-layout'
import SpellsPage from '../../components/spells/spells-page'

export const SpellsQuery = `
  query {
    spells {
      id
      name
      level
      school
      klasses
      material
      description
      concentration
      ritual
      castingTime
      duration
      range
      components
      attackSave
      damageEffect
    }
  }
`

export const getSpells = async () => {
  const result = await client.query(SpellsQuery).toPromise()

  if (!result || result.error) {
    console.log(result.error)
    return []
  }

  return result.data.spells
}

type Props = {
  spells: Array<Spell>
}

const Spells: NextPage<Props> = ({ spells = [] }) => {
  return (
    <FiltersProvider>
      <AppLayout title="Spells">
        <SpellsPage spells={spells} />
      </AppLayout>
    </FiltersProvider>
  )
}

export const getStaticProps = async () => {
  const spells: Array<Spell> = await getSpells()

  return {
    revalidate: 1,
    props: {
      spells,
    },
  }
}

export { Spells as default }
