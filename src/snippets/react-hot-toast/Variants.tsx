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
