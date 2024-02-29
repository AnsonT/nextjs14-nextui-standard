'use client'
import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Input,
  Link,
} from '@nextui-org/react'
import { FC } from 'react'
import { useForm } from 'react-hook-form'
import { SignUpFormValues } from './types'
import { useRouter } from 'next/router'

interface SignUpFormProps {
  onSubmit?: (data: SignUpFormValues) => Promise<boolean> | boolean
}

export const SignUpForm: FC<SignUpFormProps> = ({ onSubmit }) => {
  const router = useRouter()
  const {
    register,
    handleSubmit,
    setError,
    reset,
    formState: {
      errors,
      isDirty,
      isSubmitSuccessful,
      isSubmitted,
      isSubmitting,
      isValid,
    },
  } = useForm<SignUpFormValues>({
    defaultValues: {
      displayName: '',
      email: '',
      password: '',
    },
  })
  const submitHandler = async (data: SignUpFormValues) => {
    console.log(data)
    const ok = await onSubmit?.(data)
    if (ok) {
      router.replace('/')
    } else {
      reset(data)
      setError('root', { type: 'server', message: 'Sign up failed' })
    }
  }
  return (
    <form className="min-w-unit-7xl" onSubmit={handleSubmit(submitHandler)}>
      <Card>
        <CardHeader className="bg-slate-200">
          <h1 className="text-xl font-bold">Sign Up</h1>
        </CardHeader>
        <CardBody className="pt-6 px-4 gap-4">
          <Input label="Display Name" {...register('displayName')} />
          <Input
            label="Email"
            isRequired
            {...register('email', { required: true })}
          />
          {errors.email && (
            <span className="text-danger-500">This field is required</span>
          )}
          <Input
            isRequired
            label="Password"
            type="password"
            {...register('password', { required: true })}
          />
          {errors.password && (
            <span className="text-danger-500">This field is required</span>
          )}
        </CardBody>
        <CardFooter>
          <div className="w-full">
            {!isDirty && !isSubmitSuccessful && isSubmitted && (
              <p className="text-danger-500 font-bold">
                Sign up failed, please try again
              </p>
            )}

            <Button className="w-full" color="primary" type="submit">
              Sign Up
            </Button>
          </div>
        </CardFooter>
      </Card>
      <span className="text-sm text-center">
        Already registered? <Link href="/signin">Sign In</Link>
      </span>
    </form>
  )
}
