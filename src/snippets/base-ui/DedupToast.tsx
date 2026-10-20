import { Toast } from '@base-ui/react/toast'
import { viewportStyle, rootStyle, contentStyle, titleStyle, descriptionStyle, closeStyle } from './styles'

function ToastActions() {
  const toastManager = Toast.useToastManager()
  return (
    <div>
      <button
        data-testid="dedup-toast"
        onClick={() =>
          toastManager.add({
            id: 'dedup',
            title: 'Only one of me',
            description: 'Adding the same id upserts instead of duplicating.',
          })
        }
      >
        Add Dedup Toast
      </button>
      <button
        data-testid="unique-toast"
        onClick={() =>
          toastManager.add({
            title: 'Unique toast',
            description: 'This one gets a new auto-generated id each time.',
          })
        }
      >
        Add Unique Toast
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
          <Toast.Description style={descriptionStyle} />
        </div>
        <Toast.Close data-testid="close-toast" style={closeStyle}>&#x2715;</Toast.Close>
      </Toast.Content>
    </Toast.Root>
  ))
}

export default function DedupToast() {
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
