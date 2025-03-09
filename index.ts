// works on Node v14.13.0+
import { fastify } from 'fastify'

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

app.get('/api', schema, async function (req, reply) {
  return { message: 'Hello from Fastify!' }
})

app
  .listen({ port: 3000 })
  .then((value) => {
    console.log('Server run at', value)
  })
  .catch(console.error)
