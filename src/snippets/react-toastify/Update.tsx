import { useRef } from "react";
import { toast, ToastContainer } from "react-toastify";
import type { Id } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Update() {
  // ---------- Version 1: useRef approach (from older articles) ----------
  const toastId = useRef<Id | null>(null);

  const startFetchRef = () => {
    toastId.current = toast("Fetching data...", { autoClose: false });
  };

  const completeFetchRef = () => {
    if (toastId.current !== null) {
      toast.update(toastId.current, {
        render: "Data fetched successfully!",
        type: "success",
        autoClose: 5000,
      });
    }
  };

  // ---------- Version 2: direct variable approach (simpler) ----------
  // Uses a second ref, but the pattern is: assign the id directly from toast(),
  // then pass it to toast.update(). No useRef ceremony in the original article,
  // but in React we still need a ref to persist across renders.
  const directToastId = useRef<Id | null>(null);

  const startFetchDirect = () => {
    const id = toast("Fetching data...", { autoClose: false });
    directToastId.current = id;
  };

  const completeFetchDirect = () => {
    if (directToastId.current !== null) {
      /*
        In v11, toast.TYPE is removed. Use string literals instead:
          "info", "success", "warning", "error", "default"

        The following would NOT work:
          type: toast.TYPE.INFO  // toast.TYPE is undefined
      */
      toast.update(directToastId.current, {
        render: "Data fetched (direct)!",
        type: "info",
        autoClose: 5000,
      });
    }
  };

  return (
    <div>
      <h2>Toast Update</h2>

      <fieldset style={{ marginBottom: 12 }}>
        <legend>useRef approach</legend>
        <button data-testid="btn-start-ref" onClick={startFetchRef}>
          Start Fetch (ref)
        </button>
        <button data-testid="btn-complete-ref" onClick={completeFetchRef}>
          Complete Fetch (ref)
        </button>
      </fieldset>

      <fieldset>
        <legend>Direct variable approach</legend>
        <button data-testid="btn-start-direct" onClick={startFetchDirect}>
          Start Fetch (direct)
        </button>
        <button data-testid="btn-complete-direct" onClick={completeFetchDirect}>
          Complete Fetch (direct)
        </button>
      </fieldset>

      <ToastContainer />
    </div>
  );
}
