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
