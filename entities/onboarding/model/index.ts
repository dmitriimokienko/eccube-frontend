import { updateUserApi } from '@/entities/currentUser/api'
import { Nullable } from '@/shared/types'
import { createEffect, createEvent, createStore, sample } from 'effector'
import { IOnboardingCompanyData, IOnboardingUserData } from '../types'
import { currentUser } from '@/entities/currentUser/model'

const reset = createEvent()

const sendDataFx = createEffect(async () => {
  const id = currentUser.$info.getState()!.id
  const data = {
    id,
    ...$user.getState()!,
    ...$company.getState()!,
  }
  const response = await updateUserApi(data)
  return response
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

sample({
  clock: sendDataFx.doneData,
  target: reset,
})

export const onboarding = {
  $user,
  $company,
  setUserInfo,
  setCompanyInfo,
  sendDataFx,
  $isLoading,
}
