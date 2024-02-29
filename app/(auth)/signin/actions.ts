'use server'

import { SignInFormValues } from './_components/types'

export async function SignIn(data: SignInFormValues) {
  console.log(data)
  return false
}
