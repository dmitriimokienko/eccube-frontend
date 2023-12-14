import { UserType } from '..'

export interface ICreateUser {
  email: string
  password: string
  firstName: string
  lastName: string
  type: UserType
  isVerified?: boolean
  isActive?: boolean
}

export interface IUpdateUser {
  id: number
  firstName: string
  lastName: string
  email: string
  //   avatar: string
}
