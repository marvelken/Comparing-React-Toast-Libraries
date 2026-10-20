### react-hot-toast snippets

#### Basic.tsx

```tsx
import { toast, Toaster } from "react-hot-toast";

export default function Basic() {
  return (
    <div>
      <h2>Basic Toast</h2>
      <button
        data-testid="btn-basic"
        onClick={() => toast("This is a simple toast.")}
      >
        Show Basic Toast
      </button>
      <Toaster />
    </div>
  );
}
```

#### Dismiss.tsx

```tsx
import { useState } from "react";
import { toast, Toaster } from "react-hot-toast";

export default function Dismiss() {
  const [lastToastId, setLastToastId] = useState<string | null>(null);

  const handleCreate = () => {
    const id = toast("Dismissable toast", { duration: Infinity });
    setLastToastId(id);
  };

  const handleDismissById = () => {
    if (lastToastId) {
      toast.dismiss(lastToastId);
      setLastToastId(null);
    }
  };

  const handleDismissAll = () => {
    toast.dismiss();
    setLastToastId(null);
  };

  const handleCreateMultiple = () => {
    toast("Toast #1", { duration: Infinity });
    toast("Toast #2", { duration: Infinity });
    toast("Toast #3", { duration: Infinity });
  };

  return (
    <div>
      <h2>Dismiss Toasts</h2>
      <button data-testid="btn-create" onClick={handleCreate}>
        Create Toast
      </button>
      <button data-testid="btn-dismiss-id" onClick={handleDismissById}>
        Dismiss Last by ID
      </button>
      <button data-testid="btn-create-multiple" onClick={handleCreateMultiple}>
        Create 3 Toasts
      </button>
      <button data-testid="btn-dismiss-all" onClick={handleDismissAll}>
        Dismiss All
      </button>
      <Toaster />
    </div>
  );
}
```

#### MultiToaster.tsx

```tsx
import { toast, Toaster } from "react-hot-toast";

export default function MultiToaster() {
  const handleTopToast = () => {
    toast("Toast in top-right toaster", {
      toasterId: "top",
    });
  };

  const handleBottomToast = () => {
    toast("Toast in bottom-left toaster", {
      toasterId: "bottom",
    });
  };

  const handleBothToasters = () => {
    toast("Top notification", { toasterId: "top" });
    toast("Bottom notification", { toasterId: "bottom" });
  };

  const handleSuccessTop = () => {
    toast.success("Success up top!", { toasterId: "top" });
  };

  const handleErrorBottom = () => {
    toast.error("Error down below!", { toasterId: "bottom" });
  };

  return (
    <div>
      <h2>Multiple Toasters (v2.6)</h2>
      <button data-testid="btn-top-toast" onClick={handleTopToast}>
        Toast (Top-Right)
      </button>
      <button data-testid="btn-bottom-toast" onClick={handleBottomToast}>
        Toast (Bottom-Left)
      </button>
      <button data-testid="btn-both-toasters" onClick={handleBothToasters}>
        Toast Both
      </button>
      <button data-testid="btn-success-top" onClick={handleSuccessTop}>
        Success (Top)
      </button>
      <button data-testid="btn-error-bottom" onClick={handleErrorBottom}>
        Error (Bottom)
      </button>

      <Toaster toasterId="top" position="top-right" />
      <Toaster toasterId="bottom" position="bottom-left" />
    </div>
  );
}
```

#### Options.tsx

```tsx
import { toast, Toaster } from "react-hot-toast";

export default function Options() {
  const handleDuration = () => {
    toast("This toast lasts 5 seconds", {
      duration: 5000,
    });
  };

  const handleIconTheme = () => {
    toast.success("Custom icon colors", {
      iconTheme: {
        primary: "#4ade80",
        secondary: "#000",
      },
    });
  };

  const handleAriaProps = () => {
    toast("Accessible toast", {
      ariaProps: {
        role: "alert",
        "aria-live": "assertive",
      },
    });
  };

  const handleStyle = () => {
    toast("Styled toast", {
      style: {
        background: "#1e293b",
        color: "#f8fafc",
        border: "1px solid #334155",
      },
    });
  };

  const handleIcon = () => {
    toast("Custom icon toast", {
      icon: "🔥",
    });
  };

  const handleIconInStyle = () => {
    // This demonstrates that `icon` is a top-level option, NOT a style property.
    // Passing `icon` inside `style` has no effect — it does not compile as a
    // valid CSSProperties key. The toast will render without a custom icon.
    toast("Icon inside style (no effect)", {
      style: {
        background: "#fef3c7",
        // @ts-expect-error — `icon` is not a valid CSS property; this won't work
        icon: "🚫",
      },
    });
  };

  const handleCombined = () => {
    toast.success("All options combined", {
      duration: 4000,
      icon: "✅",
      iconTheme: {
        primary: "#10b981",
        secondary: "#ecfdf5",
      },
      ariaProps: {
        role: "status",
        "aria-live": "polite",
      },
      style: {
        borderRadius: "8px",
        background: "#18181b",
        color: "#fafafa",
        padding: "12px 16px",
      },
    });
  };

  return (
    <div>
      <h2>Toast Options</h2>
      <button data-testid="btn-duration" onClick={handleDuration}>
        Duration (5s)
      </button>
      <button data-testid="btn-icon-theme" onClick={handleIconTheme}>
        Icon Theme
      </button>
      <button data-testid="btn-aria" onClick={handleAriaProps}>
        Aria Props
      </button>
      <button data-testid="btn-style" onClick={handleStyle}>
        Custom Style
      </button>
      <button data-testid="btn-icon" onClick={handleIcon}>
        Custom Icon
      </button>
      <button data-testid="btn-icon-in-style" onClick={handleIconInStyle}>
        Icon in Style (No Effect)
      </button>
      <button data-testid="btn-combined" onClick={handleCombined}>
        Combined Options
      </button>
      <Toaster />
    </div>
  );
}
```

#### Promise.tsx

```tsx
import { toast, Toaster } from "react-hot-toast";

function simulateAsync(shouldFail: boolean): Promise<string> {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (shouldFail) {
        reject(new Error("Request failed"));
      } else {
        resolve("Data loaded successfully");
      }
    }, 1500);
  });
}

export default function Promise_() {
  const handleFullPromise = () => {
    toast.promise(simulateAsync(false), {
      loading: "Fetching data...",
      success: "Data fetched!",
      error: "Failed to fetch data.",
    });
  };

  const handleErrorPromise = () => {
    toast.promise(simulateAsync(true), {
      loading: "Fetching data...",
      success: "Data fetched!",
      error: "Failed to fetch data.",
    });
  };

  // v2.5 feature: optional messages — only loading is required
  const handleOptionalMessages = () => {
    toast.promise(simulateAsync(false), {
      loading: "Loading only...",
    });
  };

  // v2.5 feature: pass an async function instead of a promise
  const handleAsyncFunction = () => {
    toast.promise(
      async () => {
        const result = await simulateAsync(false);
        return result;
      },
      {
        loading: "Running async function...",
        success: (data) => `Done: ${data}`,
        error: "Async function failed.",
      }
    );
  };

  return (
    <div>
      <h2>Toast Promise</h2>
      <button data-testid="btn-promise" onClick={handleFullPromise}>
        Promise (Success)
      </button>
      <button data-testid="btn-promise-error" onClick={handleErrorPromise}>
        Promise (Error)
      </button>
      <button
        data-testid="btn-promise-optional"
        onClick={handleOptionalMessages}
      >
        Promise (Optional Msgs)
      </button>
      <button
        data-testid="btn-promise-async-fn"
        onClick={handleAsyncFunction}
      >
        Promise (Async Function)
      </button>
      <Toaster />
    </div>
  );
}
```

#### Variants.tsx

```tsx
import { toast, Toaster } from "react-hot-toast";

export default function Variants() {
  return (
    <div>
      <h2>Toast Variants</h2>
      <button
        data-testid="btn-success"
        onClick={() => toast.success("Operation succeeded!")}
      >
        Success
      </button>
      <button
        data-testid="btn-error"
        onClick={() => toast.error("Something went wrong!")}
      >
        Error
      </button>
      <button
        data-testid="btn-loading"
        onClick={() => toast.loading("Loading data...")}
      >
        Loading
      </button>
      <Toaster />
    </div>
  );
}
```

### sonner snippets

#### Basic.tsx

```tsx
import { toast, Toaster } from "sonner";

export default function Basic() {
  return (
    <div>
      <Toaster />
      <button data-testid="btn-basic" onClick={() => toast("Hello")}>
        Show Toast
      </button>
    </div>
  );
}
```

#### DescriptionAction.tsx

```tsx
import { toast, Toaster } from "sonner";

export default function DescriptionAction() {
  return (
    <div>
      <Toaster />
      <button
        data-testid="btn-description"
        onClick={() =>
          toast("Event Created", {
            description: "Monday, January 3rd at 6:00pm",
          })
        }
      >
        With Description
      </button>
      <button
        data-testid="btn-action"
        onClick={() =>
          toast("File deleted", {
            description: "The file has been permanently removed.",
            action: {
              label: "Undo",
              onClick: () => console.log("Undo"),
            },
          })
        }
      >
        With Action
      </button>
    </div>
  );
}
```

#### MultiToaster.tsx

```tsx
import { toast, Toaster } from "sonner";

export default function MultiToaster() {
  return (
    <div>
      <Toaster id="primary" position="bottom-right" />
      <Toaster id="secondary" position="top-center" />
      <button
        data-testid="btn-primary-toaster"
        onClick={() =>
          toast("Bottom-right toast", { toasterId: "primary" })
        }
      >
        Primary Toaster (bottom-right)
      </button>
      <button
        data-testid="btn-secondary-toaster"
        onClick={() =>
          toast.success("Top-center toast", { toasterId: "secondary" })
        }
      >
        Secondary Toaster (top-center)
      </button>
      <button
        data-testid="btn-both-toasters"
        onClick={() => {
          toast("Goes to primary", { toasterId: "primary" });
          toast.info("Goes to secondary", { toasterId: "secondary" });
        }}
      >
        Both Toasters
      </button>
    </div>
  );
}
```

#### PerToastOptions.tsx

```tsx
import { toast, Toaster } from "sonner";

export default function PerToastOptions() {
  return (
    <div>
      <Toaster />
      <button
        data-testid="btn-duration"
        onClick={() => toast("Stays for 10s", { duration: 10000 })}
      >
        Custom Duration (10s)
      </button>
      <button
        data-testid="btn-position"
        onClick={() =>
          toast("Top-center toast", { position: "top-center" })
        }
      >
        Custom Position
      </button>
      <button
        data-testid="btn-style"
        onClick={() =>
          toast("Styled toast", {
            style: {
              background: "#1a1a2e",
              color: "#eaf0f6",
              border: "1px solid #16213e",
            },
          })
        }
      >
        Custom Style
      </button>
      <button
        data-testid="btn-classname"
        onClick={() =>
          toast("Classy toast", { className: "my-custom-toast" })
        }
      >
        Custom ClassName
      </button>
    </div>
  );
}
```

#### Promise.tsx

```tsx
import { toast, Toaster } from "sonner";

export default function PromiseToast() {
  const handlePromise = () => {
    toast.promise(
      new Promise<{ name: string }>((resolve) =>
        setTimeout(() => resolve({ name: "Toast" }), 2000),
      ),
      {
        loading: "Loading...",
        success: (data) => `${data.name} has been added`,
        error: "Error occurred",
      },
    );
  };

  return (
    <div>
      <Toaster />
      <button data-testid="btn-promise" onClick={handlePromise}>
        Run Promise
      </button>
    </div>
  );
}
```

#### ToasterProps.tsx

```tsx
import { toast, Toaster } from "sonner";

export default function ToasterProps() {
  return (
    <div>
      <Toaster
        position="bottom-center"
        richColors
        closeButton
        visibleToasts={3}
        expand
      />
      <button
        data-testid="btn-toaster-props"
        onClick={() => toast.success("Configured toast")}
      >
        Show Toast
      </button>
      <button
        data-testid="btn-toaster-multiple"
        onClick={() => {
          toast("First toast");
          toast("Second toast");
          toast("Third toast");
          toast("Fourth toast (hidden until one closes)");
        }}
      >
        Show Multiple
      </button>
    </div>
  );
}
```

#### Variants.tsx

```tsx
import { toast, Toaster } from "sonner";

export default function Variants() {
  return (
    <div>
      <Toaster richColors />
      <button
        data-testid="btn-success"
        onClick={() => toast.success("Operation succeeded")}
      >
        Success
      </button>
      <button
        data-testid="btn-error"
        onClick={() => toast.error("Something went wrong")}
      >
        Error
      </button>
      <button
        data-testid="btn-warning"
        onClick={() => toast.warning("Careful!")}
      >
        Warning
      </button>
      <button data-testid="btn-info" onClick={() => toast.info("FYI")}>
        Info
      </button>
      <button
        data-testid="btn-loading"
        onClick={() => toast.loading("Loading...")}
      >
        Loading
      </button>
    </div>
  );
}
```

### react-toastify snippets

#### BasicWithCSS.tsx

```tsx
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function BasicWithCSS() {
  return (
    <div>
      <h2>Basic Toast (with CSS import)</h2>
      <button
        data-testid="btn-basic-css"
        onClick={() => toast.success("Operation completed successfully!")}
      >
        Show Success Toast
      </button>
      <ToastContainer />
    </div>
  );
}
```

#### BasicWithoutCSS.tsx

```tsx
import { toast, ToastContainer } from "react-toastify";
// NOTE: No CSS import — toast will render unstyled (no built-in styles).

export default function BasicWithoutCSS() {
  return (
    <div>
      <h2>Basic Toast (without CSS import)</h2>
      <button
        data-testid="btn-basic-no-css"
        onClick={() => toast.success("Operation completed successfully!")}
      >
        Show Success Toast
      </button>
      <ToastContainer />
    </div>
  );
}
```

#### CSSTransition.tsx

```tsx
import { toast, ToastContainer, cssTransition } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
// animate.css provides the bounce animation classes.
// Install with: pnpm add animate.css
import "animate.css";

const BounceTransition = cssTransition({
  enter: "animate__animated animate__bounceIn",
  exit: "animate__animated animate__bounceOut",
});

export default function CSSTransitionDemo() {
  return (
    <div>
      <h2>CSS Transition (animate.css bounce)</h2>

      <button
        data-testid="btn-bounce"
        onClick={() =>
          toast.success("Bouncing in!", { transition: BounceTransition })
        }
      >
        Bounce Toast
      </button>

      <button
        data-testid="btn-bounce-error"
        onClick={() =>
          toast.error("Bounce error!", { transition: BounceTransition })
        }
      >
        Bounce Error
      </button>

      <ToastContainer />
    </div>
  );
}
```

#### Dark.tsx

```tsx
import { useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

type ThemeVariant = "light" | "dark" | "colored";

export default function Dark() {
  const [theme, setTheme] = useState<ThemeVariant>("dark");

  return (
    <div>
      <h2>Dark / Themed Toasts</h2>

      {/*
        toast.dark() still exists in v11 — it fires a toast with the dark theme
        applied per-toast regardless of the container's theme.
      */}
      <button
        data-testid="btn-toast-dark"
        onClick={() => toast.dark("This uses toast.dark()")}
      >
        toast.dark()
      </button>

      <button
        data-testid="btn-success-dark-theme"
        onClick={() => toast.success("Success on dark container")}
      >
        Success (container theme)
      </button>

      <button
        data-testid="btn-error-dark-theme"
        onClick={() => toast.error("Error on dark container")}
      >
        Error (container theme)
      </button>

      <div style={{ marginTop: 12 }}>
        <label>
          Container theme:{" "}
          <select
            data-testid="select-theme"
            value={theme}
            onChange={(e) => setTheme(e.target.value as ThemeVariant)}
          >
            <option value="light">light</option>
            <option value="dark">dark</option>
            <option value="colored">colored</option>
          </select>
        </label>
      </div>

      {/* The container-level theme applies to all toasts in this container */}
      <ToastContainer theme={theme} />
    </div>
  );
}
```

#### Position.tsx

```tsx
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Position() {
  return (
    <div>
      <h2>Toast Positions</h2>

      {/*
        In react-toastify v11, toast.POSITION is removed.
        Positions are string literals: "top-right", "top-center", "top-left",
        "bottom-right", "bottom-center", "bottom-left".

        The following would NOT work in v11:
          position: toast.POSITION.BOTTOM_RIGHT  // toast.POSITION is undefined
      */}

      <button
        data-testid="btn-top-right"
        onClick={() =>
          toast.info("Top right (default)", { position: "top-right" })
        }
      >
        Top Right
      </button>

      <button
        data-testid="btn-top-center"
        onClick={() =>
          toast.info("Top center", { position: "top-center" })
        }
      >
        Top Center
      </button>

      <button
        data-testid="btn-top-left"
        onClick={() =>
          toast.info("Top left", { position: "top-left" })
        }
      >
        Top Left
      </button>

      <button
        data-testid="btn-bottom-right"
        onClick={() =>
          toast.info("Bottom right", { position: "bottom-right" })
        }
      >
        Bottom Right
      </button>

      <button
        data-testid="btn-bottom-center"
        onClick={() =>
          toast.info("Bottom center", { position: "bottom-center" })
        }
      >
        Bottom Center
      </button>

      <button
        data-testid="btn-bottom-left"
        onClick={() =>
          toast.info("Bottom left", { position: "bottom-left" })
        }
      >
        Bottom Left
      </button>

      <ToastContainer />
    </div>
  );
}
```

#### PromiseToast.tsx

```tsx
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function fakeApiCall(shouldSucceed: boolean): Promise<string> {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (shouldSucceed) {
        resolve("Data loaded successfully");
      } else {
        reject(new Error("Network error"));
      }
    }, 2000);
  });
}

export default function PromiseToast() {
  const handleSuccess = () => {
    toast.promise(fakeApiCall(true), {
      pending: "Loading data...",
      success: "Data loaded!",
      error: "Something went wrong",
    });
  };

  const handleError = () => {
    toast.promise(fakeApiCall(false), {
      pending: "Loading data...",
      success: "Data loaded!",
      error: "Failed to load data",
    });
  };

  const handleWithOptions = () => {
    toast.promise(
      fakeApiCall(true),
      {
        pending: {
          render: "Crunching numbers...",
          icon: false,
        },
        success: {
          render: "All done!",
          autoClose: 3000,
        },
        error: {
          render: "Oops, something broke",
        },
      },
      { position: "bottom-center" }
    );
  };

  return (
    <div>
      <h2>Promise Toast</h2>

      <button data-testid="btn-promise-success" onClick={handleSuccess}>
        Promise (resolves)
      </button>

      <button data-testid="btn-promise-error" onClick={handleError}>
        Promise (rejects)
      </button>

      <button data-testid="btn-promise-options" onClick={handleWithOptions}>
        Promise (custom options)
      </button>

      <ToastContainer />
    </div>
  );
}
```

#### Update.tsx

```tsx
import { useRef } from "react";
import { toast, ToastContainer } from "react-toastify";
import type { Id } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Update() {
  // ---------- Version 1: useRef approach (from older articles) ----------
  const toastId = useRef<Id | null>(null);

  const startFetchRef = () => {
    toastId.current = toast("Fetching data...", { autoClose: false });
  };

  const completeFetchRef = () => {
    if (toastId.current !== null) {
      toast.update(toastId.current, {
        render: "Data fetched successfully!",
        type: "success",
        autoClose: 5000,
      });
    }
  };

  // ---------- Version 2: direct variable approach (simpler) ----------
  // Uses a second ref, but the pattern is: assign the id directly from toast(),
  // then pass it to toast.update(). No useRef ceremony in the original article,
  // but in React we still need a ref to persist across renders.
  const directToastId = useRef<Id | null>(null);

  const startFetchDirect = () => {
    const id = toast("Fetching data...", { autoClose: false });
    directToastId.current = id;
  };

  const completeFetchDirect = () => {
    if (directToastId.current !== null) {
      /*
        In v11, toast.TYPE is removed. Use string literals instead:
          "info", "success", "warning", "error", "default"

        The following would NOT work:
          type: toast.TYPE.INFO  // toast.TYPE is undefined
      */
      toast.update(directToastId.current, {
        render: "Data fetched (direct)!",
        type: "info",
        autoClose: 5000,
      });
    }
  };

  return (
    <div>
      <h2>Toast Update</h2>

      <fieldset style={{ marginBottom: 12 }}>
        <legend>useRef approach</legend>
        <button data-testid="btn-start-ref" onClick={startFetchRef}>
          Start Fetch (ref)
        </button>
        <button data-testid="btn-complete-ref" onClick={completeFetchRef}>
          Complete Fetch (ref)
        </button>
      </fieldset>

      <fieldset>
        <legend>Direct variable approach</legend>
        <button data-testid="btn-start-direct" onClick={startFetchDirect}>
          Start Fetch (direct)
        </button>
        <button data-testid="btn-complete-direct" onClick={completeFetchDirect}>
          Complete Fetch (direct)
        </button>
      </fieldset>

      <ToastContainer />
    </div>
  );
}
```

#### Variants.tsx

```tsx
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Variants() {
  return (
    <div>
      <h2>Toast Variants</h2>

      <button
        data-testid="btn-success"
        onClick={() => toast.success("Success message")}
      >
        Success
      </button>

      <button
        data-testid="btn-error"
        onClick={() => toast.error("Error message")}
      >
        Error
      </button>

      {/*
        Both toast.warn() and toast.warning() exist in v11.
        They are aliases — both produce a warning toast.
      */}
      <button
        data-testid="btn-warn"
        onClick={() => toast.warn("Warn message (toast.warn)")}
      >
        Warn
      </button>

      <button
        data-testid="btn-warning"
        onClick={() => toast.warning("Warning message (toast.warning)")}
      >
        Warning
      </button>

      <button
        data-testid="btn-info"
        onClick={() => toast.info("Info message")}
      >
        Info
      </button>

      {/*
        There is no toast.default() method. Use toast() directly for a
        default-typed toast, or pass { type: "default" } explicitly.
      */}
      <button
        data-testid="btn-default"
        onClick={() => toast("Default message (toast())")}
      >
        Default
      </button>

      <button
        data-testid="btn-default-explicit"
        onClick={() => toast("Default with explicit type", { type: "default" })}
      >
        Default (explicit type)
      </button>

      <ToastContainer />
    </div>
  );
}
```

### notistack snippets

#### DirectImport.tsx

```tsx
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
```

#### NoMUI.tsx

```tsx
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
```

#### OldAPI.tsx

```tsx
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
```

#### PerSnackbarOptions.tsx

```tsx
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
```

#### ProviderOptions.tsx

```tsx
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
```

#### UseSnackbar.tsx

```tsx
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
```

#### Variants.tsx

```tsx
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
```

### @base-ui/react snippets

#### AnchoredToast.tsx

```tsx
import { useRef } from 'react'
import { Toast } from '@base-ui/react/toast'
import { rootStyle, contentStyle, titleStyle, closeStyle } from './styles'

function ToastActions() {
  const copyButtonRef = useRef<HTMLButtonElement>(null)
  const toastManager = Toast.useToastManager()

  return (
    <button
      ref={copyButtonRef}
      data-testid="copy-button"
      onClick={() => {
        toastManager.add({
          title: 'Copied to clipboard',
          timeout: 3000,
          positionerProps: {
            anchor: copyButtonRef.current,
            side: 'bottom',
            sideOffset: 8,
            align: 'center',
          },
        })
      }}
    >
      Copy
    </button>
  )
}

function ToastList() {
  const { toasts } = Toast.useToastManager()
  return toasts.map((toast) =>
    toast.positionerProps ? (
      <Toast.Root key={toast.id} toast={toast} style={rootStyle}>
        <Toast.Positioner
          toast={toast}
          anchor={toast.positionerProps.anchor}
          side={toast.positionerProps.side ?? 'bottom'}
          sideOffset={toast.positionerProps.sideOffset}
          align={toast.positionerProps.align ?? 'center'}
        >
          <Toast.Content style={contentStyle}>
            <div style={{ flex: 1 }}>
              <Toast.Title style={titleStyle} />
            </div>
            <Toast.Close data-testid="close-toast" style={closeStyle}>&#x2715;</Toast.Close>
          </Toast.Content>
        </Toast.Positioner>
      </Toast.Root>
    ) : (
      <Toast.Root key={toast.id} toast={toast} style={rootStyle}>
        <Toast.Content style={contentStyle}>
          <div style={{ flex: 1 }}>
            <Toast.Title style={titleStyle} />
          </div>
          <Toast.Close data-testid="close-toast" style={closeStyle}>&#x2715;</Toast.Close>
        </Toast.Content>
      </Toast.Root>
    ),
  )
}

export default function AnchoredToast() {
  return (
    <Toast.Provider>
      <ToastActions />
      <Toast.Portal>
        <Toast.Viewport style={{ position: 'fixed', zIndex: 9999 }}>
          <ToastList />
        </Toast.Viewport>
      </Toast.Portal>
    </Toast.Provider>
  )
}
```

#### DedupToast.tsx

```tsx
import { Toast } from '@base-ui/react/toast'
import { viewportStyle, rootStyle, contentStyle, titleStyle, descriptionStyle, closeStyle } from './styles'

function ToastActions() {
  const toastManager = Toast.useToastManager()
  return (
    <div>
      <button
        data-testid="dedup-toast"
        onClick={() =>
          toastManager.add({
            id: 'dedup',
            title: 'Only one of me',
            description: 'Adding the same id upserts instead of duplicating.',
          })
        }
      >
        Add Dedup Toast
      </button>
      <button
        data-testid="unique-toast"
        onClick={() =>
          toastManager.add({
            title: 'Unique toast',
            description: 'This one gets a new auto-generated id each time.',
          })
        }
      >
        Add Unique Toast
      </button>
    </div>
  )
}

function ToastList() {
  const { toasts } = Toast.useToastManager()
  return toasts.map((toast) => (
    <Toast.Root key={toast.id} toast={toast} style={rootStyle}>
      <Toast.Content style={contentStyle}>
        <div style={{ flex: 1 }}>
          <Toast.Title style={titleStyle} />
          <Toast.Description style={descriptionStyle} />
        </div>
        <Toast.Close data-testid="close-toast" style={closeStyle}>&#x2715;</Toast.Close>
      </Toast.Content>
    </Toast.Root>
  ))
}

export default function DedupToast() {
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
```

#### GlobalManager.tsx

```tsx
import { Toast } from '@base-ui/react/toast'
import { viewportStyle, rootStyle, contentStyle, titleStyle, closeStyle } from './styles'

const manager = Toast.createToastManager()

// Plain function outside React -- works because of the global manager
function showToast() {
  manager.add({ title: 'Hello from outside React!' })
}

function ToastActions() {
  return (
    <div>
      <button data-testid="global-toast" onClick={showToast}>
        Global Toast
      </button>
      <button
        data-testid="hook-toast"
        onClick={() => manager.add({ title: 'Also via manager ref' })}
      >
        Manager Ref Toast
      </button>
    </div>
  )
}

function ToastList() {
  const { toasts } = Toast.useToastManager()
  return toasts.map((toast) => (
    <Toast.Root key={toast.id} toast={toast} style={rootStyle}>
      <Toast.Content style={contentStyle}>
        <div style={{ flex: 1 }}>
          <Toast.Title style={titleStyle} />
        </div>
        <Toast.Close data-testid="close-toast" style={closeStyle}>&#x2715;</Toast.Close>
      </Toast.Content>
    </Toast.Root>
  ))
}

export default function GlobalManager() {
  return (
    <Toast.Provider toastManager={manager}>
      <ToastActions />
      <Toast.Portal>
        <Toast.Viewport style={viewportStyle}>
          <ToastList />
        </Toast.Viewport>
      </Toast.Portal>
    </Toast.Provider>
  )
}
```

#### Minimal.tsx

```tsx
import { Toast } from '@base-ui/react/toast'
import { viewportStyle, rootStyle, contentStyle, titleStyle, descriptionStyle, closeStyle } from './styles'

function ToastActions() {
  const toastManager = Toast.useToastManager()
  return (
    <button
      data-testid="add-toast"
      onClick={() =>
        toastManager.add({
          title: 'Notification',
          description: 'This is a minimal toast example.',
        })
      }
    >
      Show Toast
    </button>
  )
}

function ToastList() {
  const { toasts } = Toast.useToastManager()
  return toasts.map((toast) => (
    <Toast.Root key={toast.id} toast={toast} style={rootStyle}>
      <Toast.Content style={contentStyle}>
        <div style={{ flex: 1 }}>
          <Toast.Title style={titleStyle} />
          <Toast.Description style={descriptionStyle} />
        </div>
        <Toast.Close data-testid="close-toast" style={closeStyle}>&#x2715;</Toast.Close>
      </Toast.Content>
    </Toast.Root>
  ))
}

export default function Minimal() {
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
```

#### PromiseToast.tsx

```tsx
import { Toast } from '@base-ui/react/toast'
import { viewportStyle, rootStyle, contentStyle, titleStyle, descriptionStyle, closeStyle } from './styles'

function simulateSave(): Promise<{ saved: boolean }> {
  return new Promise((resolve) => {
    setTimeout(() => resolve({ saved: true }), 2000)
  })
}

function ToastActions() {
  const toastManager = Toast.useToastManager()
  return (
    <button
      data-testid="promise-toast"
      onClick={() => {
        toastManager.promise(simulateSave(), {
          loading: 'Saving changes...',
          success: (result) =>
            `Changes saved (saved: ${result.saved})`,
          error: (err: Error) =>
            `Failed to save: ${err.message}`,
        })
      }}
    >
      Save Changes
    </button>
  )
}

function ToastList() {
  const { toasts } = Toast.useToastManager()
  return toasts.map((toast) => (
    <Toast.Root key={toast.id} toast={toast} style={rootStyle}>
      <Toast.Content style={contentStyle}>
        <div style={{ flex: 1 }}>
          <Toast.Title style={titleStyle} />
          <Toast.Description style={descriptionStyle} />
        </div>
        <Toast.Close data-testid="close-toast" style={closeStyle}>&#x2715;</Toast.Close>
      </Toast.Content>
    </Toast.Root>
  ))
}

export default function PromiseToast() {
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
```

#### StyledToast.tsx

```tsx
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
  background: '#1a1a2e',
  color: '#eee',
  borderRadius: 8,
  boxShadow: '0 4px 12px rgba(0,0,0,0.25)',
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
}

const descriptionStyle: React.CSSProperties = {
  fontSize: 13,
  opacity: 0.8,
  margin: '4px 0 0',
}

const closeStyle: React.CSSProperties = {
  marginLeft: 'auto',
  cursor: 'pointer',
  background: 'transparent',
  border: 'none',
  color: '#aaa',
  fontSize: 16,
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
```

#### TypedToast.tsx

```tsx
import { Toast } from '@base-ui/react/toast'
import { viewportStyle, rootStyle, contentStyle, titleStyle, descriptionStyle, closeStyle, actionStyle } from './styles'

interface ToastData {
  actionLabel?: string
  onAction?: () => void
}

function ToastActions() {
  const toastManager = Toast.useToastManager<ToastData>()
  return (
    <button
      data-testid="add-success-toast"
      onClick={() =>
        toastManager.add({
          title: 'Item deleted',
          description: 'The item was removed successfully.',
          type: 'success',
          data: {
            actionLabel: 'Undo',
            onAction: () => {
              console.log('Undo action triggered')
            },
          },
        })
      }
    >
      Delete Item
    </button>
  )
}

function ToastList() {
  const { toasts } = Toast.useToastManager<ToastData>()
  return toasts.map((toast) => (
    <Toast.Root key={toast.id} toast={toast} style={rootStyle}>
      <Toast.Content style={contentStyle}>
        <div style={{ flex: 1 }}>
          <Toast.Title style={titleStyle} />
          <Toast.Description style={descriptionStyle} />
          {toast.data?.actionLabel && (
            <Toast.Action
              data-testid="undo-action"
              onClick={toast.data.onAction}
              style={actionStyle}
            >
              {toast.data.actionLabel}
            </Toast.Action>
          )}
        </div>
        <Toast.Close data-testid="close-toast" style={closeStyle}>&#x2715;</Toast.Close>
      </Toast.Content>
    </Toast.Root>
  ))
}

export default function TypedToast() {
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
```

### react-toast-notifications snippets

#### Basic.tsx

```tsx
import { ToastProvider, useToasts } from 'react-toast-notifications'

function Inner() {
  const { addToast } = useToasts()
  return (
    <button
      data-testid="btn-basic"
      onClick={() => addToast('Hello from react-toast-notifications!', { appearance: 'success', autoDismiss: true })}
    >
      Show Toast
    </button>
  )
}

export default function Basic() {
  return (
    <ToastProvider>
      <Inner />
    </ToastProvider>
  )
}
```
