import { Loader2 } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";

export const LoadingState = () => {
  return (
    <div className="flex h-[50vh] items-center justify-center">
      <div className="flex flex-col items-center gap-2">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
        <p className="text-muted-foreground">Chargement...</p>
      </div>
    </div>
  );
}

export const ErrorState = ({ message = "Erreur lors du chargement." }: { message?: string }) => {
  return (
    <div className="flex h-[50vh] items-center justify-center">
      <Alert variant="destructive" className="w-auto">
        <AlertDescription>{message}</AlertDescription>
      </Alert>
    </div>
  );
}