'use server'

export interface SignInData {
  email: string
  password: string
  rememberMe: boolean
}

export interface SignUpData {
  displayName: string
  email: string
  password: string
}

export interface User {
  id: string
  displayName: string
  email: string
}

export async function serverSignIn(input: SignInData) {
  console.log(input)
  return true
}

export async function serverSignUp(input: SignUpData) {
  console.log(input)
  return true
}

export async function serverSignOut() {
  return true
}

export async function serverGetUser() {
  return { id: '1', displayName: 'Test User', email: 'test@example.com' }
}
