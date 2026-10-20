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
