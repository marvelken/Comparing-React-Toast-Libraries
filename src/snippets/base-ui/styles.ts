import type { CSSProperties } from 'react'

export const viewportStyle: CSSProperties = {
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

export const rootStyle: CSSProperties = {
  background: '#fff',
  color: '#1a1a2e',
  borderRadius: 10,
  boxShadow: '0 2px 8px rgba(0,0,0,0.08), 0 1px 2px rgba(0,0,0,0.06)',
  border: '1px solid #e5e7eb',
  padding: '12px 16px',
  minWidth: 280,
}

export const contentStyle: CSSProperties = {
  display: 'flex',
  alignItems: 'flex-start',
  gap: 12,
}

export const titleStyle: CSSProperties = {
  fontWeight: 600,
  fontSize: 14,
  margin: 0,
  color: '#111827',
}

export const descriptionStyle: CSSProperties = {
  fontSize: 13,
  color: '#6b7280',
  margin: '4px 0 0',
}

export const closeStyle: CSSProperties = {
  marginLeft: 'auto',
  cursor: 'pointer',
  background: 'transparent',
  border: 'none',
  color: '#9ca3af',
  fontSize: 14,
  padding: '2px 6px',
  borderRadius: 4,
}

export const actionStyle: CSSProperties = {
  cursor: 'pointer',
  background: '#111827',
  border: 'none',
  color: '#fff',
  fontSize: 13,
  padding: '5px 12px',
  borderRadius: 6,
  marginTop: 6,
}
