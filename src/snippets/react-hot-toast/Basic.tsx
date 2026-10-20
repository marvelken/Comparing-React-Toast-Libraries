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
