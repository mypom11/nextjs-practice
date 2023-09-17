import { hash, compare } from 'bcryptjs'

export const hashPassword = async (password: string) => {
  const hashedPassword = hash(password, 12)
  return hashedPassword
}

export const verifyPassword = async (
  password: string,
  hashPassword: string
) => {
  const isValid = await compare(password, hashPassword)
  return isValid
}
