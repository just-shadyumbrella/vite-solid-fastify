import { fastify } from 'fastify'
import serveStatic from '@fastify/static'
import { dotenv } from './util'
import { readFileSync } from 'fs'
import { join } from 'path'

const env = dotenv() // It's optional whether you might prefer `config()` method
const API = new URL(env?.API_ENDPOINT || 'http://localhost:3000/api')

// Optional, read more the docs
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
const fallback = readFileSync(join(env?.ROOT || process.cwd(), 'index.html')) // Handle by SPA through entry point

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
  app.listen({ port: Number(API.port || 80), host: API.hostname })
  if (env?.NODE_ENV === 'production') console.log('Server running at', API.toString().replace(API.pathname, ''))
  console.log('Press `r` to restart, `q` to quit, `c` to clear.')
}

// Console input handler
process.stdin.on('data', (data) => {
  switch (data.toString().trim()) {
    case 'r':
      console.log('Restarting server...')
      app.server?.close(() => {
        main()
      })
      break
    case 'q':
      console.log('Quitting...')
      process.exit(0)
      break
    case 'c':
      process.stdout.write('\u001b[2J\u001b[0;0H')
      console.log('Console cleared.')
      break
  }
})

main()
