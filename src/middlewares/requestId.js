import { v4 as uuidv4 } from 'uuid'

const requestId = (options = {}) => {
  const { header = 'X-Request-Id', propertyName = 'reqId', generator = uuidv4 } = options

  return (ctx, next) => {
    const reqId = ctx.request.get(header) || generator()
    console.log('reqId:', reqId)
    ctx[propertyName] = reqId
    ctx.set(header, reqId)
    return next()
  }
}

export default requestId
