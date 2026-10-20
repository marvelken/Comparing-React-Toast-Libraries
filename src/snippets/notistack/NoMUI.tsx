/**
 * NoMUI.tsx
 *
 * Confirms that Material UI is NOT required for notistack v3.
 * This component imports exclusively from 'notistack' -- no @mui/* imports.
 * Notistack v3 ships its own default snackbar styling (MaterialDesignContent)
 * and does not depend on @mui/material at runtime.
 */

import { SnackbarProvider, enqueueSnackbar } from 'notistack';

function NoMUIDemo() {
  return (
    // No MUI ThemeProvider or CssBaseline needed.
    // notistack v3 is fully standalone.
    <SnackbarProvider>
      <div>
        <h2>No Material UI Required</h2>
        <p>
          This component uses only <code>notistack</code>. No{' '}
          <code>@mui/material</code> package is installed or imported.
        </p>
        <button
          data-testid="no-mui-enqueue"
          onClick={() =>
            enqueueSnackbar('This works without Material UI!', {
              variant: 'success',
            })
          }
        >
          Show Snackbar (no MUI)
        </button>
      </div>
    </SnackbarProvider>
  );
}

export default NoMUIDemo;
