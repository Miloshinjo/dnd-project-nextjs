import { useState } from 'react'
import { useForm } from 'react-hook-form'
import ButtonPrimary from '../../buttons/primary'
import TextInput from '../../form/text-input'
import SelectInput from '../../form/select-input'
import { Klass } from '../../../generated/graphql'
import { useModal } from '../../../context/modal'

import { useCreateCharacterMutation } from '../../../generated/graphql'
import validations from './validations'

import { Alignment } from '../../../models/alignment'

import styles from './styles.module.css'

const alignments: Array<Alignment> = [
  'Chaotic Good',
  'Chaotic Evil',
  'Chaotic Neutral',
  'True Neutral',
  'Neutral Good',
  'Neutral Evil',
  'Lawful Evil',
  'Lawful Good',
  'Lawful Neutral',
]

type FormValues = {
  name: string
  race: string
  klassId: {
    label: string
    value: string
  }
  alignment: {
    label: string
    value: string
  }
}

type Props = {
  klasses: Array<Klass>
}

const CreateCharacterForm: React.FC<Props> = ({ klasses }) => {
  const [serverError, setServerError] = useState<string>('')
  const [, createCharacter] = useCreateCharacterMutation()
  const { openModal } = useModal()

  const { register, handleSubmit, errors, control, setValue, watch } = useForm<
    FormValues
  >({
    mode: 'onBlur',
  })

  const onSubmit = ({ name, race, klassId, alignment }: FormValues) => {
    setServerError('')

    const klassIdReal = Number(klassId.value)
    const alignmentReal = alignment.value

    createCharacter({
      name,
      race,
      klassId: klassIdReal,
      alignment: alignmentReal,
    }).then((result) => {
      if (result.error) {
        setServerError(result?.error?.message || 'Unknown error occurred')
        return
      }

      openModal({
        type: 'characterCreated',
        props: {
          characterId: result.data.createCharacter.id,
          name: result.data.createCharacter.name,
          klass: result.data.createCharacter.klass.name,
          race: result.data.createCharacter.race,
        },
      })
    })
  }

  return (
    <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
      <TextInput
        label="Name"
        errors={errors}
        name="name"
        placeholder="Drizzt Do'Urden"
        register={register}
        validations={validations.name}
      />
      <TextInput
        label="Race"
        errors={errors}
        name="race"
        placeholder="Drow"
        register={register}
        validations={validations.race}
      />

      <SelectInput
        label="Alignment"
        control={control}
        errors={errors}
        name="alignment"
        options={alignments.map((alignment) => ({
          label: alignment,
          value: alignment,
        }))}
      />
      <SelectInput
        name="klassId"
        control={control}
        errors={errors}
        label="Class"
        options={klasses.map((klass) => ({
          label: klass.name,
          value: klass.id,
        }))}
      />
      <ButtonPrimary type="submit">Create your character</ButtonPrimary>
      {serverError && <p className={styles.errorText}>{serverError}</p>}
    </form>
  )
}

export { CreateCharacterForm as default }
