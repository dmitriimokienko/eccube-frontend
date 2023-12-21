'use client'
import { OnboardingLayout } from '@/shared/ui/layouts/custom/OnboardingLayout'
import Button from '@mui/material/Button'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'
import { useRouter } from 'next/navigation'
import { FormProvider, useForm } from 'react-hook-form'

export default function WelcomeOnBoardingPage() {
  // TODO: add validation
  // TODO: add i18n
  const router = useRouter()

  const form = useForm()
  const { handleSubmit } = form

  const onSubmit = async () => {
    router.push('/onboarding/user')
  }

  return (
    <OnboardingLayout>
      <Typography variant="h4" component="h1" pb={4}>
        Welcome to Eccube!
      </Typography>
      <FormProvider {...form}>
        <Stack component="form" spacing={3} onSubmit={handleSubmit(onSubmit)}>
          <Typography variant="body1" component="h1" gutterBottom>
            Before we start, please tell us a little bit about your company and yourself.
            <br />
            Please click the button below to continue.
          </Typography>
          <Button variant="contained" type="submit" sx={{ marginTop: '24px' }}>
            Start
          </Button>
        </Stack>
      </FormProvider>
    </OnboardingLayout>
  )
}
