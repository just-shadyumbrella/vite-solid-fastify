import { createResource, createSignal } from 'solid-js'
import solidLogo from './assets/solid.svg'
import fastifyLogo from './assets/fastify.svg'
import viteLogo from '/vite.svg'
import rollupLogo from '/rollup.svg'
import AppCss from './App.css?inline'

function App() {
  const [count, setCount] = createSignal(0)
  const [resource] = createResource(async () => {
    const response = await fetch('/api')
    return response.json()
  })

  return (
    <>
      <div>
        <a href='https://vite.dev' target='_blank'>
          <img src={viteLogo} class='logo vite' alt='Vite logo' />
        </a>
        <a href='https://solidjs.com' target='_blank'>
          <img src={solidLogo} class='logo solid' alt='Solid logo' />
        </a>
        <a href='https://rollupjs.org' target='_blank'>
          <img src={rollupLogo} class='logo rollup' alt='Rollup logo' />
        </a>
        <a href='https://fastify.dev' target='_blank'>
          <img src={fastifyLogo} class='logo fastify' alt='Fastify logo' />
        </a>
      </div>
      <h1>Vite + Solid ~ Rollup + Fastify</h1>
      <div class='card'>
        <button onClick={() => setCount((count) => count + 1)}>count is {count()}</button>
        <p>
          Edit <code>src/app/App.tsx</code> and save to test HMR
        </p>{' '}
        <hr />
        <p>
          Edit <code>src/server/index.ts</code> and save and replace to change the message:{' '}
          <code>{JSON.stringify(resource()?.message)}</code>
        </p>
      </div>
      <p class='read-the-docs'>Click on the Vite and Solid logos to learn more</p>
      <a href='/about'>About</a>
      <style>{AppCss}</style>
    </>
  )
}

export default App
