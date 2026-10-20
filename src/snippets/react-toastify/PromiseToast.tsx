import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function fakeApiCall(shouldSucceed: boolean): Promise<string> {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (shouldSucceed) {
        resolve("Data loaded successfully");
      } else {
        reject(new Error("Network error"));
      }
    }, 2000);
  });
}

export default function PromiseToast() {
  const handleSuccess = () => {
    toast.promise(fakeApiCall(true), {
      pending: "Loading data...",
      success: "Data loaded!",
      error: "Something went wrong",
    });
  };

  const handleError = () => {
    toast.promise(fakeApiCall(false), {
      pending: "Loading data...",
      success: "Data loaded!",
      error: "Failed to load data",
    });
  };

  const handleWithOptions = () => {
    toast.promise(
      fakeApiCall(true),
      {
        pending: {
          render: "Crunching numbers...",
          icon: false,
        },
        success: {
          render: "All done!",
          autoClose: 3000,
        },
        error: {
          render: "Oops, something broke",
        },
      },
      { position: "bottom-center" }
    );
  };

  return (
    <div>
      <h2>Promise Toast</h2>

      <button data-testid="btn-promise-success" onClick={handleSuccess}>
        Promise (resolves)
      </button>

      <button data-testid="btn-promise-error" onClick={handleError}>
        Promise (rejects)
      </button>

      <button data-testid="btn-promise-options" onClick={handleWithOptions}>
        Promise (custom options)
      </button>

      <ToastContainer />
    </div>
  );
}
