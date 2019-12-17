import { Role } from './role'

export class User {
  id: number
  name: string
  surname: string
  username: string
  password: string
  email: string
  country: string
  company: string
  employees: string
  phone: string
  language: string
  enabled: boolean
  roles: Role[]
}