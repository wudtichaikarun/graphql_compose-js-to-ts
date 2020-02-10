import Koa from 'koa'
import bodyParser from 'koa-bodyparser'
import compress from 'koa-compress'
import cors from '@koa/cors'
import gracefulShutdown from 'http-graceful-shutdown'
import { mergeSchemas } from 'graphql-tools'
import graphqlHTTP from 'koa-graphql'
import mount from 'koa-mount'
import { buildSchema } from './schema'

const app = new Koa()

;(async () => {
  app.use(
    bodyParser({
      enableTypes: ['json', 'form'],
      formLimit: '10mb',
      jsonLimit: '10mb'
    })
  )

  app.use(compress())

  app.use(
    cors({
      origin: '*',
      allowMethods: ['GET', 'HEAD', 'PUT', 'POST', 'DELETE', 'PATCH'],
      exposeHeaders: ['X-Request-Id']
    })
  )

  const schemas = await buildSchema()

  app.use(
    mount(
      '/',
      graphqlHTTP(async request => {
        return {
          schema: mergeSchemas({ schemas }),
          graphiql: true,
          context: {
            req: request
          },
          formatError: err => ({
            locations: err.locations,
            path: err.path,
            message: err.message
          })
        }
      })
    )
  )

  const PORT = 4001

  const server = app.listen(PORT, () => {
    console.log({ event: 'execute' }, `API server listening on ${PORT}`)
  })

  gracefulShutdown(server)
})()
