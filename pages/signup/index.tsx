import useRedirectFromAuth from '../../hooks/useRedirectFromAuth'

import SignupForm from '../../components/forms/signup'
import AuthLayout from '../../components/layouts/auth-layout'

const Signup = () => {
  useRedirectFromAuth()

  return (
    <AuthLayout
      messageLink="/login"
      messagePartOne="log in"
      messagePartTwo="if you have one"
      heading="Sign up for an account"
    >
      <SignupForm />
    </AuthLayout>
  )
}

export { Signup as default }
