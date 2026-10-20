/**
 * PerSnackbarOptions.tsx
 *
 * Shows per-snackbar options passed to enqueueSnackbar:
 *   - anchorOrigin (override provider default)
 *   - autoHideDuration (override provider default)
 *   - action (custom React node)
 *
 * Also tests whether `dense` is valid on per-snackbar options.
 * Result: `dense` is a SnackbarProvider prop only, NOT a per-snackbar option.
 * Passing it to enqueueSnackbar options would be a TypeScript error.
 */

import { SnackbarProvider, enqueueSnackbar, closeSnackbar } from 'notistack';

function Buttons() {
  return (
    <div>
      <h2>Per-Snackbar Options</h2>

      <button
        data-testid="per-snack-anchor"
        onClick={() =>
          enqueueSnackbar('Top-center snackbar', {
            anchorOrigin: { vertical: 'top', horizontal: 'center' },
          })
        }
      >
        Custom Anchor
      </button>

      <button
        data-testid="per-snack-duration"
        onClick={() =>
          enqueueSnackbar('Stays for 10 seconds', {
            autoHideDuration: 10000,
          })
        }
      >
        Long Duration
      </button>

      <button
        data-testid="per-snack-action"
        onClick={() => {
          const key = enqueueSnackbar('Snackbar with action button', {
            action: (snackbarKey) => (
              <button
                data-testid="per-snack-action-dismiss"
                onClick={() => closeSnackbar(snackbarKey)}
                style={{ color: 'white', border: '1px solid white', background: 'transparent', cursor: 'pointer' }}
              >
                Dismiss
              </button>
            ),
            persist: true,
          });
          // `key` is available if needed for programmatic close
          void key;
        }}
      >
        With Action
      </button>

      {/*
       * `dense` is NOT a valid per-snackbar option.
       * It only exists on SnackbarProviderProps.
       * Uncommenting the line below would cause a TypeScript error:
       *
       *   enqueueSnackbar('Dense?', { dense: true });
       *                                 ~~~~~ Property 'dense' does not exist on type 'OptionsObject'
       */}
      <button
        data-testid="per-snack-dense-test"
        onClick={() => {
          // Proving dense is invalid here -- we enqueue without it and leave a comment.
          enqueueSnackbar('dense is a provider-only prop, not a per-snackbar option');
        }}
      >
        Dense Test (provider-only)
      </button>
    </div>
  );
}

function PerSnackbarOptionsDemo() {
  return (
    <SnackbarProvider>
      <Buttons />
    </SnackbarProvider>
  );
}

export default PerSnackbarOptionsDemo;
