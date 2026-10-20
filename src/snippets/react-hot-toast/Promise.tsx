import { toast, Toaster } from "react-hot-toast";

function simulateAsync(shouldFail: boolean): Promise<string> {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (shouldFail) {
        reject(new Error("Request failed"));
      } else {
        resolve("Data loaded successfully");
      }
    }, 1500);
  });
}

export default function Promise_() {
  const handleFullPromise = () => {
    toast.promise(simulateAsync(false), {
      loading: "Fetching data...",
      success: "Data fetched!",
      error: "Failed to fetch data.",
    });
  };

  const handleErrorPromise = () => {
    toast.promise(simulateAsync(true), {
      loading: "Fetching data...",
      success: "Data fetched!",
      error: "Failed to fetch data.",
    });
  };

  // v2.5 feature: optional messages — only loading is required
  const handleOptionalMessages = () => {
    toast.promise(simulateAsync(false), {
      loading: "Loading only...",
    });
  };

  // v2.5 feature: pass an async function instead of a promise
  const handleAsyncFunction = () => {
    toast.promise(
      async () => {
        const result = await simulateAsync(false);
        return result;
      },
      {
        loading: "Running async function...",
        success: (data) => `Done: ${data}`,
        error: "Async function failed.",
      }
    );
  };

  return (
    <div>
      <h2>Toast Promise</h2>
      <button data-testid="btn-promise" onClick={handleFullPromise}>
        Promise (Success)
      </button>
      <button data-testid="btn-promise-error" onClick={handleErrorPromise}>
        Promise (Error)
      </button>
      <button
        data-testid="btn-promise-optional"
        onClick={handleOptionalMessages}
      >
        Promise (Optional Msgs)
      </button>
      <button
        data-testid="btn-promise-async-fn"
        onClick={handleAsyncFunction}
      >
        Promise (Async Function)
      </button>
      <Toaster />
    </div>
  );
}
