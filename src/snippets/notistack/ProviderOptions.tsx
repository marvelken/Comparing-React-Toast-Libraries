/**
 * ProviderOptions.tsx
 *
 * Demonstrates SnackbarProvider-level configuration:
 *   - anchorOrigin: position on screen
 *   - autoHideDuration: milliseconds before auto-dismiss
 *   - maxSnack: max visible snackbars at once
 */

import { SnackbarProvider, enqueueSnackbar } from 'notistack';

function Buttons() {
  return (
    <div>
      <h2>Provider Options</h2>
      <button
        data-testid="provider-opts-enqueue"
        onClick={() => enqueueSnackbar('Bottom-right, 3s auto-hide')}
      >
        Show Snackbar
      </button>
      <button
        data-testid="provider-opts-enqueue-many"
        onClick={() => {
          enqueueSnackbar('First');
          enqueueSnackbar('Second');
          enqueueSnackbar('Third');
          enqueueSnackbar('Fourth (should replace oldest)');
        }}
      >
        Enqueue 4 (max 3)
      </button>
    </div>
  );
}

function ProviderOptionsDemo() {
  return (
    <SnackbarProvider
      anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
      autoHideDuration={3000}
      maxSnack={3}
    >
      <Buttons />
    </SnackbarProvider>
  );
}

export default ProviderOptionsDemo;
