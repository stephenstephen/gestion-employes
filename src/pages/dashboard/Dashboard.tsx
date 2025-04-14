import { Navigate } from 'react-router-dom';
import { CardLink } from '@/components/common/CardLink';
import { useAuth } from '@/context/AuthContext';

const Dashboard: React.FC = () => {
  const { isAuthenticated } = useAuth();

  if (!isAuthenticated) return <Navigate to="/login" />;

  return (
    <section className="py-20 px-4 max-w-4xl mx-auto">
      <h1 className="text-2xl font-semibold mb-6 text-center">Bienvenue</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <CardLink
          to="/users"
          title="Gestion des utilisateurs"
          description="Voir et gérer tous les comptes utilisateurs"
          color="blue"
        />
        <CardLink
          to="/employees"
          title="Gestion des employés"
          description="Voir, ajouter ou modifier les employés"
          color="blue"
        />
      </div>
    </section>
  );
};

export default Dashboard;
