'use server'

import bcrypt from 'bcryptjs'
import { SignJWT, jwtVerify } from 'jose'
import { getLoginSession } from './manage-login-server'

const jwtSecretKey = process.env.JWT_SECRET_KEY
const jwtEncodedKey = new TextEncoder().encode(jwtSecretKey)
const loginExpStr = process.env.LOGIN_EXPIRATION_STRING || '1d'

type JwtPayload = {
  username: string
  expiresAt: Date
}

export async function hashPassword(password: string) {
  const hash = await bcrypt.hash(password, 9)
  const base64 = Buffer.from(hash).toString('base64')
  return base64
}

export async function verifyPassword(password: string, base64Hash: string) {
  const hash = Buffer.from(base64Hash, 'base64').toString()
  const isValid = await bcrypt.compare(password, hash)
  return isValid
}

export async function verifyLoginSession() {
  const jwtPayload = await getLoginSession()

  if (!jwtPayload) return false

  return jwtPayload?.username === process.env.LOGIN_USER
}

export async function signJwt(jwtPayload: JwtPayload) {
  return new SignJWT(jwtPayload)
    .setProtectedHeader({
      alg: 'HS256',
      typ: 'JWT',
    })
    .setIssuedAt()
    .setExpirationTime(loginExpStr)
    .sign(jwtEncodedKey)
}

export async function verifyJwt(jwt: string | undefined = '') {
  try {
    const { payload } = await jwtVerify(jwt, jwtEncodedKey, {
      algorithms: ['HS256'],
    })
    return payload
  } catch {
    return false
  }
}
