import { toast, Toaster } from "sonner";

export default function PerToastOptions() {
  return (
    <div>
      <Toaster />
      <button
        data-testid="btn-duration"
        onClick={() => toast("Stays for 10s", { duration: 10000 })}
      >
        Custom Duration (10s)
      </button>
      <button
        data-testid="btn-position"
        onClick={() =>
          toast("Top-center toast", { position: "top-center" })
        }
      >
        Custom Position
      </button>
      <button
        data-testid="btn-style"
        onClick={() =>
          toast("Styled toast", {
            style: {
              background: "#1a1a2e",
              color: "#eaf0f6",
              border: "1px solid #16213e",
            },
          })
        }
      >
        Custom Style
      </button>
      <button
        data-testid="btn-classname"
        onClick={() =>
          toast("Classy toast", { className: "my-custom-toast" })
        }
      >
        Custom ClassName
      </button>
    </div>
  );
}
