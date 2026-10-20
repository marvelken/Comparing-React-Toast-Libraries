import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { SnackbarProvider, enqueueSnackbar } from 'notistack'

function App() {
  return (
    <SnackbarProvider>
      <button onClick={() => enqueueSnackbar('Hello!')}>Click me</button>
    </SnackbarProvider>
  )
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
