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
