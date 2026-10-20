import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

function App() {
  return <button onClick={() => console.log('clicked')}>Click me</button>
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
