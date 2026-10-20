/**
 * DirectImport.tsx
 *
 * Current notistack v3 README pattern: wrap your app with <SnackbarProvider />,
 * then import `enqueueSnackbar` directly from 'notistack' (no hook required).
 */

import { SnackbarProvider, enqueueSnackbar, closeSnackbar } from 'notistack';

function DirectImportDemo() {
  return (
    <SnackbarProvider>
      <div>
        <h2>Direct Import (no hook)</h2>
        <button
          data-testid="direct-enqueue"
          onClick={() => enqueueSnackbar('Snackbar via direct import')}
        >
          Show Snackbar
        </button>
        <button
          data-testid="direct-close-all"
          onClick={() => closeSnackbar()}
        >
          Close All
        </button>
      </div>
    </SnackbarProvider>
  );
}

export default DirectImportDemo;
