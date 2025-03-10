/* @refresh reload */
import { render } from 'solid-js/web'
import { Route, Router } from '@solidjs/router'

import './index.css'
import Home from './App'
import About from './About'
import { NotFound, ServerFault } from './Error'

const root = document.getElementById('app')

if (import.meta.env.DEV && !(root instanceof HTMLElement)) {
  throw new Error(
    'Root element not found. Did you forget to add it to your index.html? Or maybe the id attribute got misspelled?'
  )
}

function App() {
  return (
    <Router>
      <Route path='/' component={Home} />
      <Route path='/about' component={About} />
      <Route path='*404' component={NotFound} />
      <Route path='*500' component={ServerFault} />
    </Router>
  )
}

render(() => <App />, root!)
