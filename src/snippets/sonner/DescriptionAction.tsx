import { toast, Toaster } from "sonner";

export default function DescriptionAction() {
  return (
    <div>
      <Toaster />
      <button
        data-testid="btn-description"
        onClick={() =>
          toast("Event Created", {
            description: "Monday, January 3rd at 6:00pm",
          })
        }
      >
        With Description
      </button>
      <button
        data-testid="btn-action"
        onClick={() =>
          toast("File deleted", {
            description: "The file has been permanently removed.",
            action: {
              label: "Undo",
              onClick: () => console.log("Undo"),
            },
          })
        }
      >
        With Action
      </button>
    </div>
  );
}
