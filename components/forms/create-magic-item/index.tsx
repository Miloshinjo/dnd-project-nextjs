import { useState } from 'react'
import { useForm } from 'react-hook-form'
import ButtonPrimary from '../../buttons/primary'
import TextInput from '../../form/text-input'
import SelectInput from '../../form/select-input'
import { Character } from '../../../generated/graphql'

// import { useCreateMagicItemMutation } from '../../../generated/graphql'
import validations from './validations'

import { Rarity, Type } from '../../../models/magicItem'

import styles from './styles.module.css'

const raritiesRaw: Array<Rarity> = [
  'Common',
  'Uncommon',
  'Rare',
  'Very rare',
  'Legendary',
  'Artifact',
  'Varies',
  'Unknown',
]

const typesRaw: Array<Type> = [
  'Potion',
  'Armor',
  'Ring',
  'Rod',
  'Scroll',
  'Staff',
  'Wand',
  'Weapon',
  'Wondrous Item',
]

type FormValues = {
  name: string
  description: string
  rarity: Rarity
}

type Props = {
  characterId: Character['id']
}

const CreateCharacterForm: React.FC<Props> = ({ characterId }) => {
  const [serverError, setServerError] = useState<string>('')
  // const [, createMagicItem] = useCreateMagicItemMutation()

  const { register, handleSubmit, errors, control } = useForm<FormValues>({
    mode: 'onBlur',
  })

  const onSubmit = ({ name, description, rarity }: FormValues) => {
    setServerError('')

    // createMagicItem({
    //   name,
    //   description,
    //   characterId,
    //   rarity,
    // }).then((result) => {
    //   if (result.error) {
    //     setServerError(result?.error?.message || 'Unknown error occurred')
    //     return
    //   }
    // })
  }

  return (
    <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
      <TextInput
        label="Name"
        errors={errors}
        name="name"
        placeholder="Item name"
        register={register}
        validations={validations.name}
      />
      <TextInput
        label="Description"
        errors={errors}
        name="description"
        placeholder="Item description"
        register={register}
        validations={validations.description}
      />
      <SelectInput
        isSearchable={false}
        name="rarity"
        control={control}
        errors={errors}
        label="Rarity"
        options={raritiesRaw.map((rarity) => ({
          label: rarity,
          value: rarity,
        }))}
      />
      <SelectInput
        isSearchable={false}
        name="type"
        control={control}
        errors={errors}
        label="Item type"
        options={typesRaw.map((type) => ({
          label: type,
          value: type,
        }))}
      />

      <ButtonPrimary type="submit">Create item</ButtonPrimary>
      {serverError && <p className={styles.errorText}>{serverError}</p>}
    </form>
  )
}

export { CreateCharacterForm as default }
