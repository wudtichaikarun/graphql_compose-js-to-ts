import Koa from 'koa'
import bodyParser from 'koa-bodyparser'
import compress from 'koa-compress'
import cors from '@koa/cors'
import gracefulShutdown from 'http-graceful-shutdown'
import { mergeSchemas } from 'graphql-tools'
import graphqlHTTP from 'koa-graphql'
import mount from 'koa-mount'
import { buildSchema } from './schema'
import requestId from './middlewares/requestId'
import config from './config/index'

const extensions = ({ document, variables, operationName, result, context }) => {
  return {
    runTime: `${Date.now() - context.startTime} millisecond`,
  }
}

;(async () => {
  const app = new Koa()
  app.use(
    bodyParser({
      enableTypes: ['json', 'form'],
      formLimit: '10mb',
      jsonLimit: '10mb',
    })
  )

  app.use(compress())

  app.use(
    cors({
      origin: '*',
      allowMethods: ['GET', 'HEAD', 'PUT', 'POST', 'DELETE', 'PATCH'],
      exposeHeaders: ['X-Request-Id'],
    })
  )

  // ## 3 middleware
  // app.use(requestId())

  const schemas = await buildSchema()

  app.use(
    mount(
      '/',
      // The GraphQL response allows for adding additional information in a response to a GraphQL query
      graphqlHTTP((request) => {
        return {
          schema: mergeSchemas({ schemas }),
          graphiql: true,
          context: {
            req: request,
            startTime: Date.now(),
          },
          formatError: (err) => {
            // console.error('error', err)
            return err
          },
          // https://github.com/graphql-community/koa-graphql#readme
          // extensions,
        }
      })
    )
  )

  const server = app.listen(config.PORT, () => {
    console.log(`API server listening on ${config.PORT}`)
  })

  gracefulShutdown(server)
})()
