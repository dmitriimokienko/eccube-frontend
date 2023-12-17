'use client'
import { muiTheme } from '@/core/configs/mui/theme'
import { auth } from '@/entities/auth/model'
import { currentUser } from '@/entities/currentUser/model'
import { useLayoutHeight } from '@/shared/hooks/useLayoutHeight'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Card from '@mui/material/Card'
import Stack from '@mui/material/Stack'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'
import { ThemeProvider } from '@mui/material/styles'
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

  const { screenHeight } = useLayoutHeight()
  const router = useRouter()

  const onSubmit = async (data: ILoginForm) => {
    try {
      const user = await auth.loginFx(data)
      currentUser.setInfo(user)
      router.push('/onboarding/user-info')
    } catch (error) {
      console.log(error)
      form.setError('password', {
        type: 'manual',
        message: 'Wrong email or password',
      })
    }
  }

  return (
    // TODO: think about it
    <ThemeProvider theme={muiTheme}>
      <Box
        component="main"
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          height: screenHeight || '100vh',
        }}
      >
        <Card
          elevation={3}
          sx={{
            width: '100%',
            maxWidth: 560,
            p: 4,
            m: 4,
            textAlign: 'center',
            color: 'text.primary',
            borderRadius: 1.5,
          }}
        >
          <Typography variant="h4" component="h1" gutterBottom>
            Login
          </Typography>

          <FormProvider {...form}>
            <Stack component="form" spacing={3} onSubmit={handleSubmit(onSubmit)}>
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
              <Button variant="contained" type="submit">
                Log in
              </Button>
            </Stack>
          </FormProvider>
        </Card>
      </Box>
    </ThemeProvider>
  )
}
