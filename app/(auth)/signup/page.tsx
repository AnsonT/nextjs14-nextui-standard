import { SignUp } from './actions'
import { SignUpForm } from './_components/SignUpForm'

export default function SignUpPage() {
  return <SignUpForm onSubmit={SignUp} />
}
