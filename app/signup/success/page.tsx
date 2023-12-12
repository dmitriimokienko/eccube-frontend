'use client'
import { muiTheme } from '@/core/configs/mui/theme'
import { auth } from '@/entities/auth/model'
import { currentUser } from '@/entities/currentUser/model'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Card from '@mui/material/Card'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'
import { ThemeProvider } from '@mui/material/styles'
import { redirect, useRouter } from 'next/navigation'
import { useUnit } from 'effector-react'

export interface ISignUpForm {
  email: string
  password: string
  confirmPassword: string
  isSupplier: boolean
}

export default function SignUpSuccessPage() {
  // TODO: add validation
  // TODO: add i18n
  const router = useRouter()

  const info = useUnit(currentUser.$info)

  const onSubmit = async () => {
    //   TODO: just for test
    // temporary solution
    const user = await auth.activateFx(info!.id)
    currentUser.setInfo(user)
    router.push('/login')
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
          height: '100vh',
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
          <Stack spacing={4}>
            <Typography variant="h4" component="h1" gutterBottom>
              Successfully registered
            </Typography>
            <Typography variant="body1" gutterBottom>
              Please check your email and activate your account.
            </Typography>
            <Button fullWidth variant="contained" color="primary" onClick={onSubmit}>
              Activate
            </Button>
          </Stack>
        </Card>
      </Box>
    </ThemeProvider>
  )
}
