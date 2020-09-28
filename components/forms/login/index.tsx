import { useState } from 'react'
import { useForm } from 'react-hook-form'
import Router from 'next/router'

import { saveToken } from '../../../utils/token'
import SubmitButton from '../../form/submit-button'
import TextInput from '../../form/text-input'

import validations from './validations'

import styles from './styles.module.css'
import { useLoginMutation } from '../../../generated/graphql'

type FormValues = {
  email: string
  password: string
}

const LoginForm: React.FC = () => {
  const [serverError, setServerError] = useState<string>('')
  const [loginResult, login] = useLoginMutation()

  const { register, handleSubmit, errors } = useForm<FormValues>({
    mode: 'onBlur',
  })

  const onSubmit = ({ email, password }: FormValues) => {
    setServerError('')

    login({ email, password }).then((result) => {
      if (result.error) {
        setServerError(result?.error?.message || 'Unknown error occurred')
        return
      }

      saveToken(result?.data?.login?.token)
      Router.push('/app')
    })
  }

  return (
    <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
      <TextInput
        label="Email"
        errors={errors}
        name="email"
        placeholder="lolth@underdark.io"
        register={register}
        validations={validations.email}
      />
      <TextInput
        label="Password"
        errors={errors}
        name="password"
        placeholder="spider1rules"
        register={register}
        type="password"
        validations={validations.password}
      />
      <SubmitButton text="Log in" loading={loginResult.fetching} />
      {serverError && <p className={styles.errorText}>{serverError}</p>}
    </form>
  )
}

export { LoginForm as default }
