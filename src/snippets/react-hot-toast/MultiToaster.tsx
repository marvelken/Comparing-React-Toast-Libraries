import { toast, Toaster } from "react-hot-toast";

export default function MultiToaster() {
  const handleTopToast = () => {
    toast("Toast in top-right toaster", {
      toasterId: "top",
    });
  };

  const handleBottomToast = () => {
    toast("Toast in bottom-left toaster", {
      toasterId: "bottom",
    });
  };

  const handleBothToasters = () => {
    toast("Top notification", { toasterId: "top" });
    toast("Bottom notification", { toasterId: "bottom" });
  };

  const handleSuccessTop = () => {
    toast.success("Success up top!", { toasterId: "top" });
  };

  const handleErrorBottom = () => {
    toast.error("Error down below!", { toasterId: "bottom" });
  };

  return (
    <div>
      <h2>Multiple Toasters (v2.6)</h2>
      <button data-testid="btn-top-toast" onClick={handleTopToast}>
        Toast (Top-Right)
      </button>
      <button data-testid="btn-bottom-toast" onClick={handleBottomToast}>
        Toast (Bottom-Left)
      </button>
      <button data-testid="btn-both-toasters" onClick={handleBothToasters}>
        Toast Both
      </button>
      <button data-testid="btn-success-top" onClick={handleSuccessTop}>
        Success (Top)
      </button>
      <button data-testid="btn-error-bottom" onClick={handleErrorBottom}>
        Error (Bottom)
      </button>

      <Toaster toasterId="top" position="top-right" />
      <Toaster toasterId="bottom" position="bottom-left" />
    </div>
  );
}
