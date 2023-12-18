'use client'
import { auth } from '@/entities/auth/model'
import { currentUser } from '@/entities/currentUser/model'
import { LoginLayout } from '@/shared/ui/layouts/custom/LoginLayout'
import Button from '@mui/material/Button'
import Stack from '@mui/material/Stack'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'
import { useRouter } from 'next/navigation'
import { FormProvider, useForm } from 'react-hook-form'

export interface ILoginForm {
  email: string
  password: string
}

export default function LoginPage() {
  // TODO: add validation
  // TODO: add i18n

  const form = useForm<ILoginForm>()
  const { register, handleSubmit, formState } = form
  const { errors } = formState

  const router = useRouter()

  const onSubmit = async (data: ILoginForm) => {
    try {
      const user = await auth.loginFx(data)
      currentUser.setInfo(user)
      router.push('/onboarding')
    } catch (error) {
      console.log(error)
      form.setError('password', {
        type: 'manual',
        message: 'Wrong email or password',
      })
    }
  }

  return (
    <LoginLayout>
      <Typography variant="h4" component="h1" pb={4}>
        Login
      </Typography>

      <FormProvider {...form}>
        <Stack component="form" spacing={1} onSubmit={handleSubmit(onSubmit)}>
          <TextField
            label={'Email'}
            placeholder="Enter email"
            error={!!errors?.email}
            helperText={errors?.email?.message}
            {...register('email', {
              required: 'Email is required',
              setValueAs: (value) => value.trim(),
            })}
          />
          <TextField
            type="password"
            label={'Password'}
            placeholder="Enter password"
            error={!!errors?.password}
            helperText={errors?.password?.message}
            {...register('password', {
              required: 'Password is required',
              minLength: 6,
            })}
          />
        </Stack>
        <Button variant="contained" type="submit" sx={{ marginTop: '24px' }}>
          Log in
        </Button>
      </FormProvider>
    </LoginLayout>
  )
}
