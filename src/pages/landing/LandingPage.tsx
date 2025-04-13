import React from 'react';
import { Link } from 'react-router-dom';

const LandingPage: React.FC = () => {
  return (
    <section className="py-20 text-center">
      <h1 className="text-4xl font-bold text-blue-800">Module Gestion des Employés</h1>
      <p className="mt-4 text-lg text-gray-600">
        Solution intuitive pour centraliser vos données employés.
      </p>      

      <Link 
        to="/dashboard" 
        className="mt-8 inline-block px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
      >
        Accéder au Tableau de Bord
      </Link>
    </section>
  );
};
export default LandingPage;