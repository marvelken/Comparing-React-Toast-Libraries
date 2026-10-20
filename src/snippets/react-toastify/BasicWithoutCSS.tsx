import { toast, ToastContainer } from "react-toastify";
// NOTE: No CSS import — toast will render unstyled (no built-in styles).

export default function BasicWithoutCSS() {
  return (
    <div>
      <h2>Basic Toast (without CSS import)</h2>
      <button
        data-testid="btn-basic-no-css"
        onClick={() => toast.success("Operation completed successfully!")}
      >
        Show Success Toast
      </button>
      <ToastContainer />
    </div>
  );
}
