import React from 'react'
import { useForm } from 'react-hook-form'

import { useModal } from '../../../context/modal'
import { Character } from '../../../generated/graphql'
import PrimaryButton from '../../buttons/primary'
import NumberInput from '../../form/number-input'
import NumberInputControls from '../../form/number-input-controls'
import ModalHeader from '../../modal/modal-header'

import styles from './styles.module.css'
import validations from './validations'

type FormValues = Record<string, number>

type Props = {
  characterId: Character['id']
  originalValue: number
  title: string
  type: string
  mutation: any
}

const UpdateNumberValue: React.FC<Props> = ({
  characterId,
  originalValue,
  title,
  type,
  mutation,
}) => {
  const { closeModal } = useModal()

  const [, setResult] = mutation()

  const { register, handleSubmit, errors, setValue, watch } = useForm<
    FormValues
  >({
    mode: 'onSubmit',
    defaultValues: {
      [type]: originalValue,
    },
  })

  const onSubmit = async (values: FormValues) => {
    closeModal()

    const result = await setResult({
      id: characterId,
      [type]: Number(values[type]),
    })

    if (result.error) {
      console.log('An error occured. Handle it later.')
      return
    }
  }

  const currentValue = Number(watch(type))

  return (
    <div className={styles.container}>
      <ModalHeader type={type} title={title} />
      <div className={styles.formContainer}>
        <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
          <div className={styles.inputContainer}>
            <NumberInput
              errors={errors}
              name={type}
              placeholder="0"
              register={register}
              validations={validations[type]}
            />
            <NumberInputControls
              currentValue={currentValue}
              defaultValue={originalValue}
              setValue={setValue}
              valueType={type}
            />
          </div>

          <div className={styles.submitContainer}>
            <PrimaryButton type="submit">Set</PrimaryButton>
          </div>
        </form>
      </div>
    </div>
  )
}

export { UpdateNumberValue as default }
