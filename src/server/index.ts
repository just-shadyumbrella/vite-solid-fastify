import { fastify } from 'fastify'
import serveStatic from '@fastify/static'
import { dotenv } from './util'
import { readFileSync } from 'fs'
import { join } from 'path'

const env = dotenv()
const API = new URL(env?.API_ENDPOINT || 'http://localhost:3000/api')

const schema = {
  schema: {
    response: {
      200: {
        type: 'object',
        properties: {
          message: {
            type: 'string',
          },
        },
      },
    },
  },
}

const app = fastify({
  logger: env?.NODE_ENV === 'development',
})
const fallback = readFileSync(join(env?.ROOT || process.cwd(), 'index.html'))

// Serve vite generated html
app.register(serveStatic, { root: env?.ROOT || process.cwd() })

app.setNotFoundHandler((_, reply) => {
  reply.status(404).header('Content-Type', 'text/html').send(fallback)
})

app.setErrorHandler((error, _, reply) => {
  reply
    .status(error?.statusCode || 500)
    .header('Content-Type', 'text/html')
    .send(fallback)
})

// Not must be `/api`, don't forget to update `vite.config.ts`'s `server.proxy`
app.get(API.pathname, schema, async function () {
  return { message: 'Hello from Fastify!' }
})

async function main() {
  app.listen({ port: Number(API.port || 80), host: API.hostname }).catch(console.error)
  if (env?.NODE_ENV === 'production') console.log('Server running at', API.toString().replace(API.pathname, ''))
}

main()
