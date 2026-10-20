import { ToastProvider, useToasts } from 'react-toast-notifications'

function Inner() {
  const { addToast } = useToasts()
  return (
    <button
      data-testid="btn-basic"
      onClick={() => addToast('Hello from react-toast-notifications!', { appearance: 'success', autoDismiss: true })}
    >
      Show Toast
    </button>
  )
}

export default function Basic() {
  return (
    <ToastProvider>
      <Inner />
    </ToastProvider>
  )
}
