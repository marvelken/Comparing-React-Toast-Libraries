/**
 * UseSnackbar.tsx
 *
 * Uses the `useSnackbar` hook inside a component wrapped by <SnackbarProvider>.
 * `const { enqueueSnackbar, closeSnackbar } = useSnackbar()`
 */

import { SnackbarProvider, useSnackbar } from 'notistack';

function SnackbarButtons() {
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();

  return (
    <div>
      <h2>useSnackbar Hook</h2>
      <button
        data-testid="hook-enqueue"
        onClick={() => enqueueSnackbar('Snackbar via useSnackbar hook')}
      >
        Show Snackbar
      </button>
      <button
        data-testid="hook-close-all"
        onClick={() => closeSnackbar()}
      >
        Close All
      </button>
    </div>
  );
}

function UseSnackbarDemo() {
  return (
    <SnackbarProvider>
      <SnackbarButtons />
    </SnackbarProvider>
  );
}

export default UseSnackbarDemo;
