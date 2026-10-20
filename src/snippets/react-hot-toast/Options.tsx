import { toast, Toaster } from "react-hot-toast";

export default function Options() {
  const handleDuration = () => {
    toast("This toast lasts 5 seconds", {
      duration: 5000,
    });
  };

  const handleIconTheme = () => {
    toast.success("Custom icon colors", {
      iconTheme: {
        primary: "#4ade80",
        secondary: "#000",
      },
    });
  };

  const handleAriaProps = () => {
    toast("Accessible toast", {
      ariaProps: {
        role: "alert",
        "aria-live": "assertive",
      },
    });
  };

  const handleStyle = () => {
    toast("Styled toast", {
      style: {
        background: "#1e293b",
        color: "#f8fafc",
        border: "1px solid #334155",
      },
    });
  };

  const handleIcon = () => {
    toast("Custom icon toast", {
      icon: "🔥",
    });
  };

  const handleIconInStyle = () => {
    // This demonstrates that `icon` is a top-level option, NOT a style property.
    // Passing `icon` inside `style` has no effect — it does not compile as a
    // valid CSSProperties key. The toast will render without a custom icon.
    toast("Icon inside style (no effect)", {
      style: {
        background: "#fef3c7",
        // @ts-expect-error — `icon` is not a valid CSS property; this won't work
        icon: "🚫",
      },
    });
  };

  const handleCombined = () => {
    toast.success("All options combined", {
      duration: 4000,
      icon: "✅",
      iconTheme: {
        primary: "#10b981",
        secondary: "#ecfdf5",
      },
      ariaProps: {
        role: "status",
        "aria-live": "polite",
      },
      style: {
        borderRadius: "8px",
        background: "#18181b",
        color: "#fafafa",
        padding: "12px 16px",
      },
    });
  };

  return (
    <div>
      <h2>Toast Options</h2>
      <button data-testid="btn-duration" onClick={handleDuration}>
        Duration (5s)
      </button>
      <button data-testid="btn-icon-theme" onClick={handleIconTheme}>
        Icon Theme
      </button>
      <button data-testid="btn-aria" onClick={handleAriaProps}>
        Aria Props
      </button>
      <button data-testid="btn-style" onClick={handleStyle}>
        Custom Style
      </button>
      <button data-testid="btn-icon" onClick={handleIcon}>
        Custom Icon
      </button>
      <button data-testid="btn-icon-in-style" onClick={handleIconInStyle}>
        Icon in Style (No Effect)
      </button>
      <button data-testid="btn-combined" onClick={handleCombined}>
        Combined Options
      </button>
      <Toaster />
    </div>
  );
}
