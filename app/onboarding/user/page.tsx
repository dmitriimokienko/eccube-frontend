'use client'
import { onboarding } from '@/entities/onboarding/model'
import { IOnboardingUserData } from '@/entities/onboarding/types'
import { OnboardingLayout } from '@/shared/ui/layouts/custom/SeparateLayout/OnboardingLayout'
import Button from '@mui/material/Button'
import Stack from '@mui/material/Stack'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'
import { useRouter } from 'next/navigation'
import { FormProvider, useForm } from 'react-hook-form'
import { useUnit } from 'effector-react'
import { PrevPageButton } from '@/shared/ui/layouts/custom/SeparateLayout/components/PrevPageButton'
// import { useSession } from 'next-auth/react'

export default function UserOnBoardingPage() {
  // TODO: add validation
  // TODO: add i18n
  const router = useRouter()

  const user = useUnit(onboarding.$user)

  // const session = useSession()

  const form = useForm<IOnboardingUserData>({
    defaultValues: {
      firstName: user?.firstName,
      lastName: user?.lastName,
      phoneNumber: user?.phoneNumber,
    },
  })
  const { handleSubmit, register, formState } = form
  const { errors } = formState

  const onSubmit = async (data: IOnboardingUserData) => {
    onboarding.setUserInfo(data)
    // const accessToken = session?.data?.backendTokens?.accessToken
    // await fetch(`${process.env.NEXT_PUBLIC_BACKEND_BASE_URL}/v1/user/update`, {
    //   method: 'PUT',
    //   headers: {
    //     'Content-Type': 'application/json',
    //     authorization: `Bearer ${accessToken}`,
    //   },
    //   body: JSON.stringify(data),
    // })
    router.push('/onboarding/company')
  }

  return (
    <OnboardingLayout
      Header={
        <PrevPageButton
          onClick={() => {
            router.push('/onboarding')
          }}
        >
          Previous step
        </PrevPageButton>
      }
    >
      <Typography variant="h4" component="h1" pb={4}>
        Your information
      </Typography>
      <FormProvider {...form}>
        <Stack component="form" spacing={1} onSubmit={handleSubmit(onSubmit)}>
          <TextField
            label={'First name'}
            placeholder="Enter your first name"
            error={!!errors?.firstName}
            helperText={errors?.firstName?.message}
            {...register('firstName', {
              required: 'This field is required',
              setValueAs: (value) => value.trim(),
            })}
          />
          <TextField
            label={'Last name'}
            placeholder="Enter your last name"
            error={!!errors?.lastName}
            helperText={errors?.lastName?.message}
            {...register('lastName', {
              required: 'This field is required',
              setValueAs: (value) => value.trim(),
            })}
          />
          <TextField
            label={'Phone number'}
            placeholder="Enter your phone number"
            error={!!errors?.phoneNumber}
            helperText={errors?.phoneNumber?.message}
            {...register('phoneNumber', {
              required: 'This field is required',
              setValueAs: (value) => value.trim(),
            })}
          />
          <Button variant="contained" type="submit" sx={{ marginTop: '24px' }}>
            {`Next`}
          </Button>
        </Stack>
      </FormProvider>
    </OnboardingLayout>
  )
}
