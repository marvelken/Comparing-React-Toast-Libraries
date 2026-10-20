import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { toast, Toaster } from 'sonner'

function App() {
  return (
    <>
      <button onClick={() => toast('Hello!')}>Click me</button>
      <Toaster />
    </>
  )
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
