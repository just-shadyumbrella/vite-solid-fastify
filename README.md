# Vite + Solid ~ Rollup + Fastify

A simple example to develop front-end app with Vite and SolidJS as well as Fastify backend support through Vite's [`server.proxy`](https://vite.dev/config/server-options#server-proxy) config, and bundled with Rollup.

## Usage

```bash
npm install # or pnpm install or yarn install
```

Start backend server (first) and Vite dev server

```bash
npm run dev:backend

# Open seperate terminal
npm run dev
```

## Build

```bash
npm run build
```

Or run this separately

```bash
# Client
npm run build:client

# Server
npm run build:server
```

You can now serve the production build with `npm run preview`. Or just run `node .` at [`dist`](./dist/index.js) folder, it's generally fully portable an minified by `esbuild`. You can adjust the build output by editing the [`vite.config.ts`](./vite.config.ts) file for front-end and [`rollup.config.js`](./rollup.config.js) for back-end.

The API endpoint also works alongside [Solid Router](https://docs.solidjs.com/solid-router), including 404 and 500 error pages. Check out [`src/client/index.tsx`](./src/client/index.tsx#L23) and see how the Fastify server handles SPA requests in [`src/server/index.ts`](./src/server/index.ts#L33).

### Learn more on the [Solid Website](https://solidjs.com) and come chat with us on our [Discord](https://discord.com/invite/solidjs)

## Deployment

Learn more about deploying your application with the [documentations](https://vite.dev/guide/static-deploy.html)
