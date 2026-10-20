import { toast, ToastContainer, cssTransition } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
// animate.css provides the bounce animation classes.
// Install with: pnpm add animate.css
import "animate.css";

const BounceTransition = cssTransition({
  enter: "animate__animated animate__bounceIn",
  exit: "animate__animated animate__bounceOut",
});

export default function CSSTransitionDemo() {
  return (
    <div>
      <h2>CSS Transition (animate.css bounce)</h2>

      <button
        data-testid="btn-bounce"
        onClick={() =>
          toast.success("Bouncing in!", { transition: BounceTransition })
        }
      >
        Bounce Toast
      </button>

      <button
        data-testid="btn-bounce-error"
        onClick={() =>
          toast.error("Bounce error!", { transition: BounceTransition })
        }
      >
        Bounce Error
      </button>

      <ToastContainer />
    </div>
  );
}
