import { useAuth } from '@/hooks/useAuth';
import React from 'react';
import { Navigate } from 'react-router-dom';

const Dashboard: React.FC = () => {

    const { isAuthenticated } = useAuth();

    if (!isAuthenticated) return <Navigate to="/login" />;

    return (
        <section className="py-20 text-center">
            <h1>Dashboard</h1>
        </section>
    );
};
export default Dashboard;