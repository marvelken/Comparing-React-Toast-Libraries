import { Toast } from '@base-ui/react/toast'
import { viewportStyle, rootStyle, contentStyle, titleStyle, descriptionStyle, closeStyle } from './styles'

function simulateSave(): Promise<{ saved: boolean }> {
  return new Promise((resolve) => {
    setTimeout(() => resolve({ saved: true }), 2000)
  })
}

function ToastActions() {
  const toastManager = Toast.useToastManager()
  return (
    <button
      data-testid="promise-toast"
      onClick={() => {
        toastManager.promise(simulateSave(), {
          loading: 'Saving changes...',
          success: (result) =>
            `Changes saved (saved: ${result.saved})`,
          error: (err: Error) =>
            `Failed to save: ${err.message}`,
        })
      }}
    >
      Save Changes
    </button>
  )
}

function ToastList() {
  const { toasts } = Toast.useToastManager()
  return toasts.map((toast) => (
    <Toast.Root key={toast.id} toast={toast} style={rootStyle}>
      <Toast.Content style={contentStyle}>
        <div style={{ flex: 1 }}>
          <Toast.Title style={titleStyle} />
          <Toast.Description style={descriptionStyle} />
        </div>
        <Toast.Close data-testid="close-toast" style={closeStyle}>&#x2715;</Toast.Close>
      </Toast.Content>
    </Toast.Root>
  ))
}

export default function PromiseToast() {
  return (
    <Toast.Provider>
      <ToastActions />
      <Toast.Portal>
        <Toast.Viewport style={viewportStyle}>
          <ToastList />
        </Toast.Viewport>
      </Toast.Portal>
    </Toast.Provider>
  )
}
