import { fastify } from 'fastify'
import serveStatic from '@fastify/static'

const app = fastify({
  logger: true,
})

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

app.get('/api', schema, async function () {
  return { message: 'Hello from Fastify!' }
})

// Serve vite generated html
app.register(serveStatic, { root: process.cwd() })

app
  .listen({ port: 3000 })
  .then((value) => {
    console.log('Server run at', value)
  })
  .catch(console.error)
