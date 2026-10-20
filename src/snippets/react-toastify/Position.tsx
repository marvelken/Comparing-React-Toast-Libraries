import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Position() {
  return (
    <div>
      <h2>Toast Positions</h2>

      {/*
        In react-toastify v11, toast.POSITION is removed.
        Positions are string literals: "top-right", "top-center", "top-left",
        "bottom-right", "bottom-center", "bottom-left".

        The following would NOT work in v11:
          position: toast.POSITION.BOTTOM_RIGHT  // toast.POSITION is undefined
      */}

      <button
        data-testid="btn-top-right"
        onClick={() =>
          toast.info("Top right (default)", { position: "top-right" })
        }
      >
        Top Right
      </button>

      <button
        data-testid="btn-top-center"
        onClick={() =>
          toast.info("Top center", { position: "top-center" })
        }
      >
        Top Center
      </button>

      <button
        data-testid="btn-top-left"
        onClick={() =>
          toast.info("Top left", { position: "top-left" })
        }
      >
        Top Left
      </button>

      <button
        data-testid="btn-bottom-right"
        onClick={() =>
          toast.info("Bottom right", { position: "bottom-right" })
        }
      >
        Bottom Right
      </button>

      <button
        data-testid="btn-bottom-center"
        onClick={() =>
          toast.info("Bottom center", { position: "bottom-center" })
        }
      >
        Bottom Center
      </button>

      <button
        data-testid="btn-bottom-left"
        onClick={() =>
          toast.info("Bottom left", { position: "bottom-left" })
        }
      >
        Bottom Left
      </button>

      <ToastContainer />
    </div>
  );
}
