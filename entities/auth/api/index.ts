import { ApiClient } from '@/core/api/apiClient'
import { IUser, UserType } from '@/entities/currentUser/types'
import { ICreateUser } from '@/entities/currentUser/types/dto'

const apiClient = new ApiClient()

export async function registerUserApi(data: { email: string; password: string; type: UserType }) {
  const res = await apiClient.post<ICreateUser, IUser>('/v1/auth/register', data)
  return res
}

export async function loginUserApi(data: { email: string; password: string }) {
  const res = await apiClient.post<{ email: string; password: string }, IUser>(
    '/v1/auth/login',
    data
  )
  return res
}

// TODO: delete, temporary solution
export async function activateUserApi(token: string) {
  const res = await apiClient.post<{ token: string }, IUser>('/v1/auth/activate', {
    token,
  })
  return res
}
