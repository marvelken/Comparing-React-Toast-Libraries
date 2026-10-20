/**
 * OldAPI.tsx
 *
 * Demonstrates the old article's code pattern that used `useNotistack` and `Notifier`.
 * These exports do NOT exist in notistack v3 -- attempting to import them will fail
 * at build time with a module-not-found / export-not-found error.
 *
 * This file is intentionally left as a compile-error reference so tests can confirm
 * the old API is no longer available.
 */

// @ts-expect-error -- useNotistack does not exist in notistack v3
import { useNotistack, Notifier } from 'notistack';

function OldAPINotifier() {
  // This pattern appeared in older articles but is not part of notistack v3.
  // useNotistack and Notifier were never official notistack exports.
  const notify = useNotistack();

  return (
    <div>
      <Notifier />
      <button
        data-testid="old-api-notify"
        onClick={() => notify('Hello from old API')}
      >
        Old API Notify
      </button>
    </div>
  );
}

export default OldAPINotifier;
