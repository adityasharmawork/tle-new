
import { AlertTriangle } from "lucide-react";

export default function ErrorMessage({ message = "Something went wrong. Please try again." }) {
  return (
    <div className="bg-destructive/10 text-destructive rounded-lg p-4 flex items-center">
      <AlertTriangle className="h-5 w-5 mr-2" />
      <p>{message}</p>
    </div>
  );
}
