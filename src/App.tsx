import { lazy, Suspense } from 'react'

// Dynamic import based on URL search params: ?lib=react-hot-toast&snippet=Basic
const modules = import.meta.glob('./snippets/**/*.tsx') as Record<string, () => Promise<{ default: React.ComponentType }>>

function App() {
  const params = new URLSearchParams(window.location.search)
  const lib = params.get('lib')
  const snippet = params.get('snippet')

  if (!lib || !snippet) {
    return <div>Pass ?lib=xxx&amp;snippet=yyy in the URL</div>
  }

  const key = `./snippets/${lib}/${snippet}.tsx`
  const loader = modules[key]

  if (!loader) {
    return <div>Module not found: {key}. Available: {Object.keys(modules).join(', ')}</div>
  }

  const Component = lazy(loader)

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Component />
    </Suspense>
  )
}

export default App
