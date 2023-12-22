import { ApiClient } from '@/core/api/apiClient'

export async function startMollieAuthApi() {
  const apiClient = new ApiClient()
  const res = await apiClient.get<any>('/auth')
  console.log(res)
  return res
}
