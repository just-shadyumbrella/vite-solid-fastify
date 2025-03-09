/* @refresh reload */
import { render } from 'solid-js/web'
import { Router, Route } from '@solidjs/router'

import './index.css'
import Home from './App.tsx'
import { About } from './About.tsx'

const root = document.getElementById('app')

if (import.meta.env.DEV && !(root instanceof HTMLElement)) {
  throw new Error(
    'Root element not found. Did you forget to add it to your index.html? Or maybe the id attribute got misspelled?',
  )
}

function App() {
  return (
    <Router>
      <Route path='/' component={Home} />
      <Route path='/about' component={About} />
    </Router>
  )
}

render(() => <App />, root!)
