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
