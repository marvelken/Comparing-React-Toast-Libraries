import { useRef } from 'react'
import { Toast } from '@base-ui/react/toast'
import { rootStyle, contentStyle, titleStyle, closeStyle } from './styles'

function ToastActions() {
  const copyButtonRef = useRef<HTMLButtonElement>(null)
  const toastManager = Toast.useToastManager()

  return (
    <button
      ref={copyButtonRef}
      data-testid="copy-button"
      onClick={() => {
        toastManager.add({
          title: 'Copied to clipboard',
          timeout: 3000,
          positionerProps: {
            anchor: copyButtonRef.current,
            side: 'bottom',
            sideOffset: 8,
            align: 'center',
          },
        })
      }}
    >
      Copy
    </button>
  )
}

function ToastList() {
  const { toasts } = Toast.useToastManager()
  return toasts.map((toast) =>
    toast.positionerProps ? (
      <Toast.Root key={toast.id} toast={toast} style={rootStyle}>
        <Toast.Positioner
          toast={toast}
          anchor={toast.positionerProps.anchor}
          side={toast.positionerProps.side ?? 'bottom'}
          sideOffset={toast.positionerProps.sideOffset}
          align={toast.positionerProps.align ?? 'center'}
        >
          <Toast.Content style={contentStyle}>
            <div style={{ flex: 1 }}>
              <Toast.Title style={titleStyle} />
            </div>
            <Toast.Close data-testid="close-toast" style={closeStyle}>&#x2715;</Toast.Close>
          </Toast.Content>
        </Toast.Positioner>
      </Toast.Root>
    ) : (
      <Toast.Root key={toast.id} toast={toast} style={rootStyle}>
        <Toast.Content style={contentStyle}>
          <div style={{ flex: 1 }}>
            <Toast.Title style={titleStyle} />
          </div>
          <Toast.Close data-testid="close-toast" style={closeStyle}>&#x2715;</Toast.Close>
        </Toast.Content>
      </Toast.Root>
    ),
  )
}

export default function AnchoredToast() {
  return (
    <Toast.Provider>
      <ToastActions />
      <Toast.Portal>
        <Toast.Viewport style={{ position: 'fixed', zIndex: 9999 }}>
          <ToastList />
        </Toast.Viewport>
      </Toast.Portal>
    </Toast.Provider>
  )
}
