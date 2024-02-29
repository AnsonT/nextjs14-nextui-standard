import { SignInForm } from './_components/SignInForm'
import { SignIn } from './actions'

export default function SignInPage() {
  return <SignInForm onSubmit={SignIn} />
}
