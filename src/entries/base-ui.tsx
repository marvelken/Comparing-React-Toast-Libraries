import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { Toast } from '@base-ui/react/toast'

function ToastButton() {
  const toastManager = Toast.useToastManager()
  return (
    <button onClick={() => toastManager.add({ title: 'Hello!' })}>
      Click me
    </button>
  )
}

function ToastList() {
  const { toasts } = Toast.useToastManager()
  return toasts.map((toast) => (
    <Toast.Root key={toast.id} toast={toast}>
      <Toast.Content>
        <Toast.Title />
        <Toast.Close>×</Toast.Close>
      </Toast.Content>
    </Toast.Root>
  ))
}

function App() {
  return (
    <Toast.Provider>
      <ToastButton />
      <Toast.Portal>
        <Toast.Viewport>
          <ToastList />
        </Toast.Viewport>
      </Toast.Portal>
    </Toast.Provider>
  )
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
