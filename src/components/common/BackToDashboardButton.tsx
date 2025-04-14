import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

interface BackToDashboardButtonProps {
  className?: string;
  variant?: "outline" | "ghost" | "link";
}

export function BackToDashboardButton({
  className = "",
  variant = "outline",
}: BackToDashboardButtonProps) {
  return (
    <Link to="/dashboard">
      <Button
        variant={variant}
        className={`flex items-center gap-2 ${className}`}
      >
        <ArrowLeft className="w-4 h-4" />
        Retour au tableau de bord
      </Button>
    </Link>
  );
}