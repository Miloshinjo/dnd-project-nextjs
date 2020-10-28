import { useState } from 'react'
import { useForm } from 'react-hook-form'

import { useModal } from '../../../context/modal'
import {
  Character,
  useCreateMagicItemMutation,
} from '../../../generated/graphql'

import {
  RarityType,
  ItemType,
  WeaponType,
  ArmorType,
} from '../../../models/magicItem'
import ButtonPrimary from '../../buttons/primary'
import CheckboxInput from '../../form/checkbox-input'
import SelectInput from '../../form/select-input'
import TextInput from '../../form/text-input'
import TextareaInput from '../../form/textarea-input'

import { raritiesRaw, typesRaw, weaponsRaw, armorsRaw } from './data'

import styles from './styles.module.css'
import validations from './validations'

type FormValues = {
  name: string
  description: string
  rarity: {
    label: RarityType
    value: RarityType
  }
  type: { label: ItemType; value: ItemType }
  attunement: boolean
  weaponType?: { label: WeaponType; value: WeaponType }
  armorType?: { label: ArmorType; value: ArmorType }
}

type Props = {
  characterId: Character['id']
}

const CreateCharacterForm: React.FC<Props> = ({ characterId }) => {
  const [serverError, setServerError] = useState<string>('')
  const [, createMagicItem] = useCreateMagicItemMutation()
  const { closeModal } = useModal()

  const { register, handleSubmit, errors, control, watch } = useForm<
    FormValues
  >({
    mode: 'onBlur',
  })

  const onSubmit = ({
    name,
    description,
    rarity,
    attunement,
    type,
    armorType,
    weaponType,
  }: FormValues) => {
    setServerError('')

    const rarityReal = rarity.value
    const typeReal = type.value
    const armorTypeReal = armorType?.value ?? null
    const weaponTypeReal = weaponType?.value ?? null

    createMagicItem({
      name,
      description,
      characterId,
      rarity: rarityReal,
      type: typeReal,
      attunement,
      weaponType: weaponTypeReal,
      armorType: armorTypeReal,
    }).then((result) => {
      if (result.error) {
        setServerError(result?.error?.message || 'Unknown error occurred')
        return
      }

      if (result?.data) {
        closeModal()
      }
    })
  }

  const shouldPickWeaponType = watch('type')?.value === 'Weapon'
  const shouldPickArmorType = watch('type')?.value === 'Armor'

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
      <TextareaInput
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
      {shouldPickWeaponType && (
        <SelectInput
          isSearchable={false}
          name="weaponType"
          control={control}
          errors={errors}
          label="Weapon type"
          options={weaponsRaw.map((type) => ({
            label: type,
            value: type,
          }))}
        />
      )}
      {shouldPickArmorType && (
        <SelectInput
          isSearchable={false}
          name="armorType"
          control={control}
          errors={errors}
          label="Armor type"
          options={armorsRaw.map((type) => ({
            label: type,
            value: type,
          }))}
        />
      )}
      <span className="mt-2" />
      <CheckboxInput
        register={register}
        name="attunement"
        currentValue={watch('attunement')}
      />

      <ButtonPrimary type="submit">Create item</ButtonPrimary>
      {serverError && <p className={styles.errorText}>{serverError}</p>}
    </form>
  )
}

export { CreateCharacterForm as default }
