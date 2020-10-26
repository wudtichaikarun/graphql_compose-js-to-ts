import jwt from 'jsonwebtoken'
import config from '../config/index'

function verifyToken(token) {
  try {
    jwt.verify(token, config.token.secret)
  } catch (error) {
    throw error
  }
}

export async function authMiddleware(resolver, source, args, context, info) {
  const {
    header: { authorization = '' },
  } = context.req

  const token = authorization.replace('Bearer ', '')
  if (!token) {
    throw new Error('Token not provided')
  }

  verifyToken(token)

  const res = await resolver(source, args, context, info)
  return res
}
