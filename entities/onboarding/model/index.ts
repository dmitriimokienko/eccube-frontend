import { Nullable } from '@/shared/types'
import { createEffect, createEvent, createStore, sample } from 'effector'
import { IOnboardingCompanyData, IOnboardingUserData } from '../types'
import { currentUser } from '@/entities/currentUser/model'

const reset = createEvent()

const sendDataFx = createEffect(async (accessToken: string) => {
  const data = {
    ...$user.getState()!,
    ...$company.getState()!,
  }
  const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_BASE_URL}/v1/user/update`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      authorization: `Bearer ${accessToken}`,
    },
    body: JSON.stringify(data),
  })
  const res = await response.json()
  return res
})

const $user = createStore<Nullable<IOnboardingUserData>>(null)
const setUserInfo = createEvent<Nullable<IOnboardingUserData>>()

const $company = createStore<Nullable<IOnboardingCompanyData>>(null)
const setCompanyInfo = createEvent<Nullable<IOnboardingCompanyData>>()

$user.on(setUserInfo, (_, payload) => payload).on(reset, () => null)
$company.on(setCompanyInfo, (_, payload) => payload).on(reset, () => null)

const $isLoading = sendDataFx.pending

sample({
  clock: sendDataFx.doneData,
  fn: (data) => data,
  target: currentUser.setInfo,
})

// sample({
//   clock: sendDataFx.doneData,
//   target: reset,
// })

export const onboarding = {
  $user,
  $company,
  setUserInfo,
  setCompanyInfo,
  sendDataFx,
  $isLoading,
}
