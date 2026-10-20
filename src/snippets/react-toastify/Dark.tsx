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
