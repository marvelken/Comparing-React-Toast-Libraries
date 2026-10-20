import { Toast } from '@base-ui/react/toast'
import { viewportStyle, rootStyle, contentStyle, titleStyle, closeStyle } from './styles'

const manager = Toast.createToastManager()

// Plain function outside React -- works because of the global manager
function showToast() {
  manager.add({ title: 'Hello from outside React!' })
}

function ToastActions() {
  return (
    <div>
      <button data-testid="global-toast" onClick={showToast}>
        Global Toast
      </button>
      <button
        data-testid="hook-toast"
        onClick={() => manager.add({ title: 'Also via manager ref' })}
      >
        Manager Ref Toast
      </button>
    </div>
  )
}

function ToastList() {
  const { toasts } = Toast.useToastManager()
  return toasts.map((toast) => (
    <Toast.Root key={toast.id} toast={toast} style={rootStyle}>
      <Toast.Content style={contentStyle}>
        <div style={{ flex: 1 }}>
          <Toast.Title style={titleStyle} />
        </div>
        <Toast.Close data-testid="close-toast" style={closeStyle}>&#x2715;</Toast.Close>
      </Toast.Content>
    </Toast.Root>
  ))
}

export default function GlobalManager() {
  return (
    <Toast.Provider toastManager={manager}>
      <ToastActions />
      <Toast.Portal>
        <Toast.Viewport style={viewportStyle}>
          <ToastList />
        </Toast.Viewport>
      </Toast.Portal>
    </Toast.Provider>
  )
}
