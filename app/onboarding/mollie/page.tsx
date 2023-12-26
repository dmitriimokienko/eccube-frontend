'use client'
import { onboarding } from '@/entities/onboarding/model'
import { IOnboardingCompanyData } from '@/entities/onboarding/types'
import { OnboardingLayout } from '@/shared/ui/layouts/custom/SeparateLayout/OnboardingLayout'
import Button from '@mui/material/Button'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'
import { useRouter } from 'next/navigation'
import { FormProvider, useForm } from 'react-hook-form'
import { PrevPageButton } from '@/shared/ui/layouts/custom/SeparateLayout/components/PrevPageButton'
import { useEffect, useRef } from 'react'
import { startMollieAuthApi } from '@/entities/onboarding/api'
import { Nullable } from '@/shared/types'

const POPUP_HEIGHT = 700
const POPUP_WIDTH = 600

export default function MollieOnBoardingPage() {
  // TODO: add validation
  // TODO: add i18n

  const popupRef = useRef<Nullable<Window>>()

  const router = useRouter()

  const form = useForm<{ authToken: Nullable<string> }>({
    defaultValues: {
      authToken: null,
    },
  })
  const { handleSubmit } = form

  // fast solution
  // TODO: refactor, use MuiDialog
  const openPopup = (url: string) => {
    const top = window.outerHeight / 2 + window.screenY - POPUP_HEIGHT / 2
    const left = window.outerWidth / 2 + window.screenX - POPUP_WIDTH / 2
    return window.open(
      url,
      'OAuth2 Popup',
      `height=${POPUP_HEIGHT},width=${POPUP_WIDTH},top=${top},left=${left}`
    )
  }

  useEffect(() => {
    const startMollieAuthProcess = async () => {
      const data = await startMollieAuthApi()
      const { authorizationUri } = data || {}
      popupRef.current = openPopup(authorizationUri)
    }
    const handleMessageListener = (event: MessageEvent) => {
      console.log(event?.data)
    }
    window.addEventListener('message', handleMessageListener)
    startMollieAuthProcess()
    return () => {
      window.removeEventListener('message', handleMessageListener)
    }
  }, [])

  const onSubmit = async (data: IOnboardingCompanyData) => {
    try {
      onboarding.setCompanyInfo(data)
      await onboarding.sendDataFx()
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
            router.push('/onboarding/company')
          }}
        >
          Previous step
        </PrevPageButton>
      }
    >
      <Typography variant="h4" component="h1" pb={4}>
        Mollie authorization
      </Typography>
      <FormProvider {...form}>
        <Stack component="form" spacing={1} onSubmit={handleSubmit(onSubmit)}>
          <Button variant="contained" type="submit" sx={{ marginTop: '24px' }}>
            {`Finish`}
          </Button>
        </Stack>
      </FormProvider>
    </OnboardingLayout>
  )
}
