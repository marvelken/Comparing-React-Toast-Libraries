/**
 * Variants.tsx
 *
 * Shows all five built-in notistack variants:
 * default, success, error, warning, info.
 */

import { SnackbarProvider, enqueueSnackbar } from 'notistack';

function VariantButtons() {
  return (
    <div>
      <h2>Snackbar Variants</h2>
      <button
        data-testid="variant-default"
        onClick={() => enqueueSnackbar('Default snackbar')}
      >
        Default
      </button>
      <button
        data-testid="variant-success"
        onClick={() => enqueueSnackbar('Success!', { variant: 'success' })}
      >
        Success
      </button>
      <button
        data-testid="variant-error"
        onClick={() => enqueueSnackbar('Error occurred', { variant: 'error' })}
      >
        Error
      </button>
      <button
        data-testid="variant-warning"
        onClick={() => enqueueSnackbar('Warning!', { variant: 'warning' })}
      >
        Warning
      </button>
      <button
        data-testid="variant-info"
        onClick={() => enqueueSnackbar('For your information', { variant: 'info' })}
      >
        Info
      </button>
    </div>
  );
}

function VariantsDemo() {
  return (
    <SnackbarProvider>
      <VariantButtons />
    </SnackbarProvider>
  );
}

export default VariantsDemo;
