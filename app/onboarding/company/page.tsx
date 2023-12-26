'use client'
import { onboarding } from '@/entities/onboarding/model'
import { IOnboardingCompanyData } from '@/entities/onboarding/types'
import { OnboardingLayout } from '@/shared/ui/layouts/custom/SeparateLayout/OnboardingLayout'
import Button from '@mui/material/Button'
import Stack from '@mui/material/Stack'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'
import { useRouter } from 'next/navigation'
import { FormProvider, useForm } from 'react-hook-form'
import { useUnit } from 'effector-react'
import { PrevPageButton } from '@/shared/ui/layouts/custom/SeparateLayout/components/PrevPageButton'
import { useSession } from 'next-auth/react'

export default function CompanyOnBoardingPage() {
  // TODO: add validation
  // TODO: add i18n
  const router = useRouter()
  const session = useSession()

  const { company, updateData } = useUnit({
    company: onboarding.$company,
    updateData: onboarding.sendDataFx,
  })

  const form = useForm<IOnboardingCompanyData>({
    defaultValues: {
      company: company?.company,
      address: company?.address,
    },
  })
  const { handleSubmit, register, formState } = form
  const { errors } = formState

  const onSubmit = async (data: IOnboardingCompanyData) => {
    try {
      onboarding.setCompanyInfo(data)
      const accessToken = session?.data?.backendTokens?.accessToken
      await updateData(accessToken!)
      router.push('/onboarding/mollie')
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <OnboardingLayout
      Header={
        <PrevPageButton
          onClick={() => {
            router.push('/onboarding/user')
          }}
        >
          Previous step
        </PrevPageButton>
      }
    >
      <Typography variant="h4" component="h1" pb={4}>
        Company information
      </Typography>
      <FormProvider {...form}>
        <Stack component="form" spacing={1} onSubmit={handleSubmit(onSubmit)}>
          <TextField
            label={'Company name'}
            placeholder="Enter company name"
            error={!!errors?.company}
            helperText={errors?.company?.message}
            {...register('company', {
              required: 'This field is required',
              setValueAs: (value) => value.trim(),
            })}
          />
          <TextField
            label={'Address'}
            placeholder="Enter company address"
            error={!!errors?.address}
            helperText={errors?.address?.message}
            {...register('address', {
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
