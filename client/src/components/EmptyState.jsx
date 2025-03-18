
import { CalendarX } from "lucide-react";

export default function EmptyState({ 
  title = "No contests found",
  description = "There are no contests matching your current filters.",
  icon = "calendar"
}) {
  return (
    <div className="flex flex-col items-center justify-center py-12 px-4 text-center">
      <div className="bg-secondary rounded-full p-3 mb-4">
        <CalendarX className="h-6 w-6 text-muted-foreground" />
      </div>
      <h3 className="text-lg font-medium">{title}</h3>
      <p className="mt-2 text-sm text-muted-foreground max-w-md">
        {description}
      </p>
    </div>
  );
}
