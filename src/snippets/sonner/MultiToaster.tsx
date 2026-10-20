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
