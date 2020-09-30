import { useState } from 'react'
import { useForm } from 'react-hook-form'
import Router from 'next/router'

import SubmitButton from '../../form/submit-button'
import TextInput from '../../form/text-input'

import { useSignupMutation } from '../../../generated/graphql'
import validations from './validations'

import styles from './styles.module.css'

type FormValues = {
  email: string
  password: string
  passwordConfirm: string
  username: string
}

const LoginForm: React.FC = () => {
  const [serverError, setServerError] = useState<string>('')
  const [signupResult, signup] = useSignupMutation()

  const { register, handleSubmit, errors, watch } = useForm<FormValues>({
    mode: 'onBlur',
  })

  const onSubmit = ({
    email,
    password,
    passwordConfirm,
    username,
  }: FormValues) => {
    setServerError('')

    signup({ email, password, passwordConfirm, username }).then((result) => {
      if (result.error) {
        setServerError(result?.error?.message || 'Unknown error occurred')
        return
      }

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
        validations={validations(watch).email}
      />
      <TextInput
        label="Username"
        errors={errors}
        name="username"
        placeholder="queen01"
        register={register}
        validations={validations(watch).username}
      />
      <TextInput
        label="Password"
        errors={errors}
        name="password"
        placeholder="spider1rules"
        register={register}
        type="password"
        validations={validations(watch).password}
      />
      <TextInput
        label="Confirm Password"
        errors={errors}
        name="passwordConfirm"
        placeholder="spider1rules"
        register={register}
        type="password"
        validations={validations(watch).passwordConfirm}
      />
      <SubmitButton text="Sign up" loading={signupResult.fetching} />
      {serverError && <p className={styles.errorText}>{serverError}</p>}
    </form>
  )
}

export { LoginForm as default }
