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
