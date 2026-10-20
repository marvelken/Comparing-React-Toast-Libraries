import { useRef } from 'react'
import { Toast } from '@base-ui/react/toast'

interface ToastData {
  actionLabel?: string
  onAction?: () => void
}

function simulateSave(): Promise<{ saved: boolean }> {
  return new Promise((resolve) => {
    setTimeout(() => resolve({ saved: true }), 2000)
  })
}

const btn: React.CSSProperties = {
  padding: '10px 20px',
  fontSize: 14,
  fontWeight: 500,
  fontFamily: 'Inter, system-ui, -apple-system, sans-serif',
  cursor: 'pointer',
  borderRadius: 8,
  border: '1px solid #e5e7eb',
  background: '#fff',
  color: '#111827',
  boxShadow: '0 1px 2px rgba(0,0,0,0.05)',
  transition: 'all 0.15s ease',
}

const btnPrimary: React.CSSProperties = {
  ...btn,
  background: '#111827',
  color: '#fff',
  border: '1px solid #111827',
}

function AllButtons() {
  const copyRef = useRef<HTMLButtonElement>(null)
  const toastManager = Toast.useToastManager<ToastData>()

  return (
    <div
      style={{
        minHeight: '100vh',
        background: '#fff',
        fontFamily: 'Inter, system-ui, -apple-system, sans-serif',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 48,
      }}
    >
      <div style={{ textAlign: 'center', marginBottom: 48 }}>
        <h1
          style={{
            fontSize: 28,
            fontWeight: 700,
            color: '#111827',
            margin: 0,
            letterSpacing: '-0.02em',
          }}
        >
          Base UI Toast
        </h1>
        <p style={{ fontSize: 15, color: '#6b7280', marginTop: 8 }}>
          Headless, composable, fully accessible toast notifications
        </p>
      </div>

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, auto)',
          gap: 12,
          justifyContent: 'center',
        }}
      >
        {/* Minimal */}
        <button
          data-testid="add-toast"
          style={btn}
          onClick={() =>
            toastManager.add({
              title: 'Notification',
              description: 'This is a minimal toast example.',
            })
          }
        >
          Minimal
        </button>

        {/* Styled */}
        <button
          data-testid="add-styled-toast"
          style={btn}
          onClick={() =>
            toastManager.add({
              title: 'Styled notification',
              description: 'This toast has inline styles for a usable layout.',
            })
          }
        >
          Styled
        </button>

        {/* Success with Undo action */}
        <button
          data-testid="add-success-toast"
          style={btn}
          onClick={() =>
            toastManager.add({
              title: 'Item deleted',
              description: 'The item was removed successfully.',
              type: 'success',
              data: {
                actionLabel: 'Undo',
                onAction: () => console.log('Undo triggered'),
              },
            })
          }
        >
          Success + Undo
        </button>

        {/* Promise */}
        <button
          data-testid="promise-toast"
          style={btnPrimary}
          onClick={() => {
            toastManager.promise(simulateSave(), {
              loading: 'Saving changes...',
              success: (r) => `Changes saved (saved: ${r.saved})`,
              error: (e: Error) => `Failed: ${e.message}`,
            })
          }}
        >
          Promise
        </button>

        {/* Dedup */}
        <button
          data-testid="dedup-toast"
          style={btnPrimary}
          onClick={() =>
            toastManager.add({
              id: 'dedup',
              title: 'Only one of me',
              description: 'Same id upserts instead of duplicating.',
            })
          }
        >
          Dedup
        </button>

        {/* Anchored */}
        <button
          ref={copyRef}
          data-testid="copy-button"
          style={btnPrimary}
          onClick={() => {
            toastManager.add({
              title: 'Copied to clipboard',
              timeout: 3000,
              positionerProps: {
                anchor: copyRef.current,
                side: 'bottom',
                sideOffset: 8,
                align: 'center',
              },
            })
          }}
        >
          Anchored
        </button>
      </div>
    </div>
  )
}

function ToastList() {
  const { toasts } = Toast.useToastManager<ToastData>()
  return toasts.map((toast) =>
    toast.positionerProps ? (
      <Toast.Root
        key={toast.id}
        toast={toast}
        style={{
          background: '#fff',
          color: '#111827',
          borderRadius: 10,
          boxShadow: '0 4px 16px rgba(0,0,0,0.10), 0 1px 3px rgba(0,0,0,0.06)',
          border: '1px solid #e5e7eb',
          padding: '12px 16px',
          minWidth: 220,
          fontFamily: 'Inter, system-ui, -apple-system, sans-serif',
        }}
      >
        <Toast.Positioner
          toast={toast}
          anchor={toast.positionerProps.anchor}
          side={toast.positionerProps.side ?? 'bottom'}
          sideOffset={toast.positionerProps.sideOffset}
          align={toast.positionerProps.align ?? 'center'}
        >
          <Toast.Content style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <Toast.Title style={{ fontWeight: 600, fontSize: 13, margin: 0, flex: 1 }} />
            <Toast.Close
              data-testid="close-toast"
              style={{
                cursor: 'pointer',
                background: 'transparent',
                border: 'none',
                color: '#9ca3af',
                fontSize: 13,
                padding: '2px 6px',
                borderRadius: 4,
              }}
            >
              &#x2715;
            </Toast.Close>
          </Toast.Content>
        </Toast.Positioner>
      </Toast.Root>
    ) : (
      <Toast.Root
        key={toast.id}
        toast={toast}
        style={{
          background: '#fff',
          color: '#111827',
          borderRadius: 10,
          boxShadow: '0 4px 16px rgba(0,0,0,0.10), 0 1px 3px rgba(0,0,0,0.06)',
          border: '1px solid #e5e7eb',
          padding: '14px 18px',
          minWidth: 300,
          fontFamily: 'Inter, system-ui, -apple-system, sans-serif',
        }}
      >
        <Toast.Content style={{ display: 'flex', alignItems: 'flex-start', gap: 12 }}>
          <div style={{ flex: 1 }}>
            <Toast.Title style={{ fontWeight: 600, fontSize: 14, margin: 0, color: '#111827' }} />
            <Toast.Description style={{ fontSize: 13, color: '#6b7280', margin: '4px 0 0' }} />
            {toast.data?.actionLabel && (
              <Toast.Action
                data-testid="undo-action"
                onClick={toast.data.onAction}
                style={{
                  cursor: 'pointer',
                  background: '#111827',
                  border: 'none',
                  color: '#fff',
                  fontSize: 13,
                  padding: '5px 12px',
                  borderRadius: 6,
                  marginTop: 8,
                }}
              >
                {toast.data.actionLabel}
              </Toast.Action>
            )}
          </div>
          <Toast.Close
            data-testid="close-toast"
            style={{
              cursor: 'pointer',
              background: 'transparent',
              border: 'none',
              color: '#9ca3af',
              fontSize: 14,
              padding: '2px 6px',
              borderRadius: 4,
            }}
          >
            &#x2715;
          </Toast.Close>
        </Toast.Content>
      </Toast.Root>
    ),
  )
}

export default function Showcase() {
  return (
    <Toast.Provider>
      <AllButtons />
      <Toast.Portal>
        <Toast.Viewport
          style={{
            position: 'fixed',
            bottom: 20,
            right: 20,
            display: 'flex',
            flexDirection: 'column',
            gap: 10,
            zIndex: 9999,
            padding: 0,
            margin: 0,
            listStyle: 'none',
            maxWidth: 380,
          }}
        >
          <ToastList />
        </Toast.Viewport>
      </Toast.Portal>
    </Toast.Provider>
  )
}
