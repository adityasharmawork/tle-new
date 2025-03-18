
import { Loader2 } from "lucide-react";

export default function LoadingSpinner({ size = "default" }) {
  const sizeClass = 
    size === "small" ? "h-4 w-4" : 
    size === "large" ? "h-8 w-8" : 
    "h-6 w-6";
  
  return (
    <div className="flex items-center justify-center py-8">
      <Loader2 className={`${sizeClass} animate-spin text-muted-foreground`} />
    </div>
  );
}
