import React from 'react'
import { IoIosClose } from 'react-icons/io'
import { useForm } from 'react-hook-form'

import { useModal } from '../../../context/modal'
import { subclassTitle } from '../../../utils/character'
import SelectInput from '../../form/select-input'
import ButtonPrimary from '../../buttons/primary'
import Loader from '../../layout/loader'
import ModalHeader from '../../modal/modal-header'

import {
  Character,
  useSubclassesQuery,
  useAddSubclassMutation,
} from '../../../generated/graphql'

import styles from './styles.module.css'

type FormValues = Record<
  string,
  {
    value: string
    label: string
  }
>

type Props = {
  characterId: Character['id']
  originalValue: {
    id: string | undefined
    label: string | undefined
  }
  klassName: string
}

const UpdateSubclass: React.FC<Props> = ({
  characterId,
  originalValue,
  klassName,
}) => {
  const { closeModal } = useModal()

  const [subclassesResult] = useSubclassesQuery({
    variables: {
      klassName,
    },
  })

  const [, addSubclass] = useAddSubclassMutation()

  const { handleSubmit, errors, control, watch } = useForm<FormValues>({
    mode: 'onSubmit',
    defaultValues: {
      subclass: originalValue.id ? originalValue : null,
    },
  })

  const onSubmit = async (values: FormValues) => {
    closeModal()

    const subclassId = (values.subclass as any).value

    const subclassResult = await addSubclass({
      id: `${characterId}`,
      subclassId,
    })

    if (subclassResult.error) {
      console.log('An error occured. Handle it later.')
      return
    }
  }

  if (subclassesResult.fetching) {
    return (
      <div className="m-8">
        <Loader />
      </div>
    )
  }

  if (subclassesResult.error) {
    console.log(subclassesResult.error)
    return (
      <div>{subclassesResult?.error?.message || 'Unknown error occurred'}</div>
    )
  }

  const { subclasses } = subclassesResult.data

  if (!subclasses.length) {
    return (
      <div className={styles.container}>
        <ModalHeader
          type=""
          closeModal={closeModal}
          title={subclassTitle[klassName]}
        />
        <div className="p-4">
          <p className="my-2 text-left">
            {klassName} not supported yet. Working on it...
          </p>
        </div>
      </div>
    )
  }

  return (
    <div className={styles.container}>
      <ModalHeader
        type={klassName}
        closeModal={closeModal}
        title={subclassTitle[klassName]}
      />

      <div className={styles.formContainer}>
        <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
          <SelectInput
            control={control}
            value={watch('subclass')}
            errors={errors}
            label={''}
            name="subclass"
            options={subclasses.map((el) => {
              return {
                value: el.id,
                label: el.name,
              }
            })}
          />

          <div className={styles.submitContainer}>
            <ButtonPrimary type="submit">Set</ButtonPrimary>
          </div>
        </form>
      </div>
    </div>
  )
}

export { UpdateSubclass as default }
