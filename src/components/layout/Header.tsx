import { Button } from "@/components/ui/button";
import { useAuth } from "@/context/AuthContext";
import { LogOut } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const { logout, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <header className="bg-white shadow-sm">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <h1 className="text-xl font-semibold text-blue-800">Gestion des Employés</h1>

        {
          isAuthenticated &&
            <Button
              variant="outline"
              className="text-red-600 hover:text-red-800 border-red-600 hover:border-red-800"
              onClick={handleLogout}
            >
              <LogOut className="w-4 h-4 mr-2" />
              Déconnexion
            </Button>
        }

      </div>
    </header>
  );
};

export default Header;
