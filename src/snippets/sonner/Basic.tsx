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
