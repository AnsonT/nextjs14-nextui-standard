'use client'
import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Checkbox,
  Input,
  Link,
} from '@nextui-org/react'
import { FC } from 'react'
import { useForm, useFormState } from 'react-hook-form'
import { SignInFormValues } from './types'
import { useRouter } from 'next/navigation'

interface SignInFormProps {
  onSubmit?: (data: SignInFormValues) => Promise<boolean> | boolean
}

export const SignInForm: FC<SignInFormProps> = ({ onSubmit }) => {
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
  } = useForm<SignInFormValues>({
    defaultValues: {
      email: '',
      password: '',
      rememberMe: false,
    },
  })
  const submitHandler = async (data: SignInFormValues) => {
    console.log(data)
    const ok = await onSubmit?.(data)
    if (ok) {
      router.replace('/')
    } else {
      reset(data)
      setError('root', { type: 'server', message: 'Invalid email or password' })
    }
  }
  return (
    <form className="min-w-unit-7xl" onSubmit={handleSubmit(submitHandler)}>
      <Card>
        <CardHeader className="bg-slate-200">
          <h1 className="text-xl font-bold">Sign In</h1>
        </CardHeader>
        <CardBody className="pt-6 px-4 gap-4">
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

          <div className="flex-row flex justify-between">
            <Checkbox>Remember Me</Checkbox>
            <Link href="/auth/forgot-password">Forgot Password</Link>
          </div>
        </CardBody>
        <CardFooter>
          <div className="w-full">
            {!isDirty && !isSubmitSuccessful && isSubmitted && (
              <p className="text-danger-500 font-bold">
                Invalid email or password
              </p>
            )}
            <Button
              isDisabled={!isDirty || isSubmitting || !isValid}
              className="w-full"
              color="primary"
              type="submit"
            >
              Sign In
            </Button>
          </div>
        </CardFooter>
      </Card>
      <span className="text-sm text-center">
        Not registered? <Link href="/signup">Sign Up</Link>
      </span>
    </form>
  )
}
