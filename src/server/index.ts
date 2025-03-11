import { readFileSync } from 'fs'
import { join } from 'path'
import { fastify } from 'fastify'
import serveStatic from '@fastify/static'
import { probablyBrowser } from './util'
import { config } from 'dotenv'

config()

const API = new URL(process.env.API_ENDPOINT || 'http://localhost:3000/api')

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
  logger: process.env.NODE_ENV === 'development',
})
const fallback = readFileSync(join(process.env.ROOT || process.cwd(), 'index.html')) // SPA entry point

// Serve vite generated html
app.register(serveStatic, { root: process.env.ROOT || process.cwd() })

app.setNotFoundHandler((request, reply) => {
  if (probablyBrowser(request.headers)) {
    reply.status(404).header('Content-Type', 'text/html').send(fallback) // Let it handle by SPA router
  } else {
    reply.status(404).send('Not found')
  }
})

app.setErrorHandler((error, request, reply) => {
  if (probablyBrowser(request.headers)) {
    reply
      .status(error?.statusCode || 500)
      .header('Content-Type', 'text/html')
      .send(fallback)
  } else {
    reply.status(error?.statusCode || 500).send('Server fault')
    console.error(error)
  }
})

// Not must be `/api`, don't forget to update `vite.config.ts`'s `server.proxy`
app.get(API.pathname, schema, async function () {
  return { message: 'Hello from Fastify!' }
})

async function main() {
  app.listen({ port: Number(API.port || 80), host: API.hostname })
  if (process.env.NODE_ENV === 'production') console.log('Server running at', API.toString().replace(API.pathname, ''))
  console.log('Press `q` to quit, `c` to clear.')
}

// Console input handler
process.stdin.on('data', (data) => {
  switch (data.toString().trim()) {
    case 'q':
      console.log('Closing server...') // Restart is probably impossible: https://github.com/fastify/fastify/issues/2411
      process.exit(0) // You can respawn by using `pm2` or implement platform-specific logic using `start` command in Windows for example.
      break
    case 'c':
      process.stdout.write('\u001b[2J\u001b[0;0H')
      console.log('Console cleared.')
      break
  }
})

main()
