import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function BasicWithCSS() {
  return (
    <div>
      <h2>Basic Toast (with CSS import)</h2>
      <button
        data-testid="btn-basic-css"
        onClick={() => toast.success("Operation completed successfully!")}
      >
        Show Success Toast
      </button>
      <ToastContainer />
    </div>
  );
}
