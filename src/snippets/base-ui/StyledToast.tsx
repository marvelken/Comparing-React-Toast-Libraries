import { Toast } from '@base-ui/react/toast'

/*
 * Inline styles needed for a usable toast layout:
 *  1. viewport: position fixed, bottom/right placement, flex column, gap, z-index, padding
 *  2. toast root: background, color, border-radius, box-shadow, padding, min-width
 *  3. content: flex layout for row arrangement, gap, align-items
 *  4. title: font-weight
 *  5. description: font-size, opacity
 *  6. close button: margin-left auto, cursor, background/border reset
 *
 * Total: ~20 CSS properties across 6 elements to get a fully usable toast stack.
 */

const viewportStyle: React.CSSProperties = {
  position: 'fixed',
  bottom: 16,
  right: 16,
  display: 'flex',
  flexDirection: 'column',
  gap: 8,
  zIndex: 9999,
  padding: 0,
  margin: 0,
  listStyle: 'none',
  maxWidth: 360,
}

const rootStyle: React.CSSProperties = {
  background: '#fff',
  color: '#1a1a2e',
  borderRadius: 10,
  boxShadow: '0 2px 8px rgba(0,0,0,0.08), 0 1px 2px rgba(0,0,0,0.06)',
  border: '1px solid #e5e7eb',
  padding: '12px 16px',
  minWidth: 280,
}

const contentStyle: React.CSSProperties = {
  display: 'flex',
  alignItems: 'flex-start',
  gap: 12,
}

const textStyle: React.CSSProperties = {
  flex: 1,
}

const titleStyle: React.CSSProperties = {
  fontWeight: 600,
  fontSize: 14,
  margin: 0,
  color: '#111827',
}

const descriptionStyle: React.CSSProperties = {
  fontSize: 13,
  color: '#6b7280',
  margin: '4px 0 0',
}

const closeStyle: React.CSSProperties = {
  marginLeft: 'auto',
  cursor: 'pointer',
  background: 'transparent',
  border: 'none',
  color: '#9ca3af',
  fontSize: 14,
  padding: '2px 6px',
  borderRadius: 4,
}

function ToastActions() {
  const toastManager = Toast.useToastManager()
  return (
    <button
      data-testid="add-styled-toast"
      onClick={() =>
        toastManager.add({
          title: 'Styled notification',
          description: 'This toast has inline styles for a usable layout.',
        })
      }
      style={{
        padding: '8px 16px',
        fontSize: 14,
        cursor: 'pointer',
      }}
    >
      Show Styled Toast
    </button>
  )
}

function ToastList() {
  const { toasts } = Toast.useToastManager()
  return toasts.map((toast) => (
    <Toast.Root key={toast.id} toast={toast} style={rootStyle}>
      <Toast.Content style={contentStyle}>
        <div style={textStyle}>
          <Toast.Title style={titleStyle} />
          <Toast.Description style={descriptionStyle} />
        </div>
        <Toast.Close data-testid="close-toast" style={closeStyle}>
          &#x2715;
        </Toast.Close>
      </Toast.Content>
    </Toast.Root>
  ))
}

export default function StyledToast() {
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
