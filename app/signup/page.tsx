'use client'
import { muiTheme } from '@/core/configs/mui/theme'
import { auth } from '@/entities/auth/model'
import { currentUser } from '@/entities/currentUser/model'
import { UserType } from '@/entities/currentUser/types'
import { useLayoutHeight } from '@/shared/hooks/useLayoutHeight'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Card from '@mui/material/Card'
import Checkbox from '@mui/material/Checkbox'
import FormControlLabel from '@mui/material/FormControlLabel'
import FormGroup from '@mui/material/FormGroup'
import Stack from '@mui/material/Stack'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'
import { ThemeProvider } from '@mui/material/styles'
import { redirect, useRouter } from 'next/navigation'
import { omit } from 'ramda'
import { FormProvider, useForm } from 'react-hook-form'

export interface ISignUpForm {
  email: string
  password: string
  confirmPassword: string
  isSupplier: boolean
}

export default function SignUpPage() {
  // TODO: add validation
  // TODO: add i18n

  const form = useForm<ISignUpForm>()
  const { register, handleSubmit, formState } = form
  const { errors } = formState

  const { screenHeight } = useLayoutHeight()
  const router = useRouter()

  const onSubmit = async (data: ISignUpForm) => {
    const { password, confirmPassword } = data
    if (password !== confirmPassword) {
      form.setError('confirmPassword', {
        type: 'manual',
        message: 'Password does not match',
      })
      return
    }
    const type = data.isSupplier ? UserType.Supplier : UserType.Customer
    const payload = omit(['confirmPassword', 'isSupplier'], { ...data, type })
    const { id } = await auth.registerFx(payload)
    currentUser.setInfo({ id } as any)
    router.push('/signup/success')
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
            Sign Up
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
              <TextField
                type="password"
                label={'Confirm Password'}
                placeholder="Repeat password"
                error={!!errors?.confirmPassword}
                helperText={errors?.confirmPassword?.message}
                {...register('confirmPassword', {
                  required: 'Confirm password is required',
                  minLength: 6,
                })}
              />
              <FormGroup>
                <FormControlLabel
                  control={<Checkbox {...register('isSupplier')} defaultChecked={false} />}
                  label={'I am a supplier'}
                />
              </FormGroup>
              <Button variant="contained" type="submit">
                Continue
              </Button>
            </Stack>
          </FormProvider>
        </Card>
      </Box>
    </ThemeProvider>
  )
}
