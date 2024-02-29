'use server'

import { SignUpFormValues } from './_components/types'

export async function SignUp(data: SignUpFormValues) {
  console.log(data)
  return true
}
