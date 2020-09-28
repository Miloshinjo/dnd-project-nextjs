import useRedirectFromAuth from '../../hooks/useRedirectFromAuth'

import LoginForm from '../../components/forms/login'
import AuthLayout from '../../components/layouts/auth-layout'

const Login = () => {
  useRedirectFromAuth()
  return (
    <AuthLayout
      messageLink="/signup"
      messagePartOne="sign up"
      messagePartTwo="if you don't have one"
      heading="Log in to your account"
    >
      <LoginForm />
    </AuthLayout>
  )
}

export { Login as default }
