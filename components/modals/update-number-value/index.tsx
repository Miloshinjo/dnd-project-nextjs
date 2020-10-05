import React from 'react'
import { IoIosClose } from 'react-icons/io'
import { useForm } from 'react-hook-form'

import { useModal } from '../../../context/modal'
import NumberInput from '../../form/number-input'
import NumberInputControls from '../../form/number-input-controls'
import PrimaryButton from '../../buttons/primary'
import { Character } from '../../../generated/graphql'

import icons from './icons'
import validations from './validations'
import styles from './styles.module.css'

type FormValues = Record<string, number>

type Props = {
  characterId: Character['id']
  originalValue: number
  title: string
  type: string
  mutation: Function
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
      <div className={styles.header}>
        <div className={styles.headerTitle}>
          {icons[type]}
          <h1 className={styles.heading}>{title}</h1>
        </div>
        <button className={styles.close} onClick={closeModal}>
          <IoIosClose size={35} />
        </button>
      </div>

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
