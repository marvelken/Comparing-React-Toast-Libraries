import { Toast } from '@base-ui/react/toast'
import { viewportStyle, rootStyle, contentStyle, titleStyle, descriptionStyle, closeStyle, actionStyle } from './styles'

interface ToastData {
  actionLabel?: string
  onAction?: () => void
}

function ToastActions() {
  const toastManager = Toast.useToastManager<ToastData>()
  return (
    <button
      data-testid="add-success-toast"
      onClick={() =>
        toastManager.add({
          title: 'Item deleted',
          description: 'The item was removed successfully.',
          type: 'success',
          data: {
            actionLabel: 'Undo',
            onAction: () => {
              console.log('Undo action triggered')
            },
          },
        })
      }
    >
      Delete Item
    </button>
  )
}

function ToastList() {
  const { toasts } = Toast.useToastManager<ToastData>()
  return toasts.map((toast) => (
    <Toast.Root key={toast.id} toast={toast} style={rootStyle}>
      <Toast.Content style={contentStyle}>
        <div style={{ flex: 1 }}>
          <Toast.Title style={titleStyle} />
          <Toast.Description style={descriptionStyle} />
          {toast.data?.actionLabel && (
            <Toast.Action
              data-testid="undo-action"
              onClick={toast.data.onAction}
              style={actionStyle}
            >
              {toast.data.actionLabel}
            </Toast.Action>
          )}
        </div>
        <Toast.Close data-testid="close-toast" style={closeStyle}>&#x2715;</Toast.Close>
      </Toast.Content>
    </Toast.Root>
  ))
}

export default function TypedToast() {
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
